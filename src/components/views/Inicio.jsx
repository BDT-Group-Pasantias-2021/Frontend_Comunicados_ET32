/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';

// Styles
import '../../css/home.css';

// Hooks
import { ComunicadoCardContext } from '../../hooks/useContext/ComunicadoCardContext';
import { useHistory } from 'react-router';
// Components
import SortAndFilter from '../common/InicioView/SortAndFilter';
import ComunicadoModal from '../common/InicioView/ComunicadoModal';
import FechaComunicado from '../common/InicioView/FechaComunicado';

// eslint-disable-next-line no-unused-vars
import Axios from 'axios';

// Data
import config from '../../data/config.json';

export default function Inicio({ showNavbar, homePageLocation }) {
	//* Obtención de comunicados
	const [fechaComunicados, setFechaComunicados] = useState([]);
	const [fechaComunicadosAux, setFechaComunicadosAux] = useState([]);
	const [firstFetch, setFirstFetch] = useState(true);

	//* Activación de modal
	const [activeModal, setActiveModal] = useState(null);
	const [modalAction, setModalAction] = useState('read');

	const getComunicados = (setFechaComunicados, setFechaComunicadosAux, setFirstFetch, orderBy) => {
		setFirstFetch(false);
		const email = localStorage.getItem('user-email');
		const values = { email: email };
		Axios.post(`http://${config.host}:${config.port}/${config.basename}/search_receptor_comunicados`, values).then(
			(res) => {
				const fechasOrdenadasPorDia = orderBy(res.data).map((element) => {
					const orderedComunicados = element.comunicados.sort((a, b) =>
						a.id_comunicaciones < b.id_comunicaciones ? 1 : -1
					);

					return { ...element, comunicados: orderedComunicados };
				});
				setFechaComunicados(fechasOrdenadasPorDia);
				setFechaComunicadosAux(fechasOrdenadasPorDia);
			}
		);
	};

	const orderComunicadosByDate = (fechaComunicados) => {
		const fechaComunicadosOrdenados = fechaComunicados.sort((a, b) => {
			const dateA = new Date(a.fecha);
			const dateB = new Date(b.fecha);
			return dateB - dateA;
		});

		return fechaComunicadosOrdenados;
	};

	const orderComunicadosByDateDesc = (fechaComunicados) => {
		const fechaComunicadosOrdenados = fechaComunicados.sort((a, b) => {
			const dateA = new Date(a.fecha);
			const dateB = new Date(b.fecha);
			return dateA - dateB;
		});

		return fechaComunicadosOrdenados;
	};

	const cleanFilters = () => {
		setFechaComunicadosAux(fechaComunicados);
		document.getElementById('input-filter') && (document.getElementById('input-filter').value = '');
	};

	const filterComunicadosByDate = (fecha) => {
		function addZero(i) {
			if (i < 10) {
				i = '0' + i;
			}
			return i;
		}

		console.log(fecha);
		const fechaComunicadosFiltrados = fechaComunicados.filter((element) => {
			let date = new Date(element.fecha);
			let dateFilter = fecha;
			date = date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate());

			if (date === dateFilter) {
				return element;
			}
		});

		setFechaComunicadosAux(fechaComunicadosFiltrados);
	};

	const filterComunicadosByTag = (tag) => {
		const comunicadoWithTags = [];

		const fechaComunicadosFiltrados = fechaComunicados.filter((element) => {
			const comunicadosFiltrados = element.comunicados.filter((comunicado) => {
				if (comunicado.etiquetas) {
					comunicado.etiquetas.forEach((etiqueta) => {
						if (etiqueta.id_etiqueta === parseInt(tag)) {
							comunicadoWithTags.push({ fecha: element.fecha, comunicados: [comunicado] });
						}
					});
				}
			});
		});

		// Crear un nuevo array con los comunicados que repitan la fecha
		const fechaComunicadosFiltradosAux = [];
		comunicadoWithTags.forEach((element) => {
			let existe = false;
			fechaComunicadosFiltradosAux.map((elementAux) => {
				if (elementAux.fecha === element.fecha) {
					existe = true;
					elementAux.comunicados.push(element.comunicados[0]);
				}
			});
			if (!existe) {
				fechaComunicadosFiltradosAux.push(element);
			}
		});
		setFechaComunicadosAux(fechaComunicadosFiltradosAux);
	};

	const filterComunicadosByEmisor = (searchValue) => {
		const newFechaComunicados = fechaComunicados.reduce((acc, element) => {
			const comunicados = element.comunicados.filter((comunicado) => {
				return comunicado.emisor
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase()
					.includes(searchValue.toLowerCase());
			});
			if (comunicados.length > 0) {
				acc.push({ fecha: element.fecha, comunicados });
			}
			return acc;
		}, []);
		setFechaComunicadosAux(newFechaComunicados);
	};

	const deleteComunicado = (id, selectedFecha) => {
		const confirmState = window.confirm('¿Estás seguro de eliminar este comunicado?');
		const email = localStorage.getItem('user-email');
		const values = { idComunicado: id, emisor: email };
		if (confirmState) {
			Axios.post(`http://${config.host}:${config.port}/${config.basename}/deleteComunicado`, values).then(
				(res) => {
					if (res.data.status === 1) {
						const newFechaComunicados = fechaComunicados.map((element) => {
							if (element.fecha === selectedFecha) {
								const comunicados = element.comunicados.filter(
									(comunicado) => comunicado.id_comunicaciones !== id
								);
								return { fecha: element.fecha, comunicados };
							}
							return element;
						});
						setFechaComunicadosAux(newFechaComunicados);
					} else if (res.data.status === 2) {
						alert('El comunicado no existe');
					} else {
						alert('No se pudo eliminar el comunicado');
					}
				}
			);
		}
	};

	const updateComunicado = (id, selectedFecha, comunicado) => {
		const newFechaComunicados = fechaComunicados.map((element) => {
			if (element.fecha === selectedFecha) {
				const comunicados = element.comunicados.map((comunicadoElement) => {
					if (comunicadoElement.id_comunicaciones === id) {
						return { ...comunicadoElement, titulo: comunicado.titulo, descripcion: comunicado.descripcion };
					}
					return comunicadoElement;
				});
				return { fecha: element.fecha, comunicados };
			}
			return element;
		});
		setFechaComunicados(newFechaComunicados);
	};

	const signComunicado = (id, selectedFecha) => {
		const newFechaComunicados = fechaComunicados.map((element) => {
			if (element.fecha === selectedFecha) {
				const comunicados = element.comunicados.map((comunicado) => {
					if (comunicado.id_comunicaciones === id) {
						const email = localStorage.getItem('user-email');
						const values = { idComunicado: id, email: email };
						Axios.post(
							`http://${config.host}:${config.port}/${config.basename}/firmarComunicado`,
							values
						).then((res) => {});
						return { ...comunicado, leido: true };
					}
					return comunicado;
				});
				return { fecha: element.fecha, comunicados };
			}
			return element;
		});

		setFechaComunicados(newFechaComunicados);
	};

	// PETICION AXIOS AL BACKEND PARA VERIFICAR QUE LA TOKEN EXISTA EN LA DB
	let history = useHistory();
	useEffect(() => {
		if (firstFetch) {
			getComunicados(setFechaComunicados, setFechaComunicadosAux, setFirstFetch, orderComunicadosByDate);
		}

		// search in fechaComunicados and returns an array of comunicados that match the search value
		const searchComunicadoBySearchValue = (searchValue) => {
			const newFechaComunicados = fechaComunicados.reduce((acc, element) => {
				const comunicados = element.comunicados.filter((comunicado) => {
					return (
						comunicado.titulo
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.toLowerCase()
							.includes(searchValue.toLowerCase()) ||
						comunicado.descripcion
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.toLowerCase()
							.includes(searchValue.toLowerCase())
					);
				});
				if (comunicados.length > 0) {
					acc.push({ fecha: element.fecha, comunicados });
				}
				return acc;
			}, []);
			setFechaComunicadosAux(newFechaComunicados);
		};

		//* Mostrar barras de navegación
		showNavbar(true);
		homePageLocation(true);
		const userToken = localStorage.getItem('user-token');
		const emailToken = localStorage.getItem('user-email');
		if (!userToken || !emailToken) {
			history.push('/');
		}

		const newComunicadoButton = document.getElementById('new-comunicado-button');
		if (newComunicadoButton) {
			newComunicadoButton.addEventListener('click', () => {
				setModalAction('insert');
				setActiveModal(true);
			});
		}

		const searchBar = document.getElementById('search-bar');
		if (searchBar) {
			searchBar.addEventListener('input', (event) => {
				searchComunicadoBySearchValue(event.target.value);
			});
		}

		return () => {
			if (newComunicadoButton) {
				newComunicadoButton.removeEventListener('click', () => {
					setModalAction('insert');
					setActiveModal(true);
				});
			}

			if (searchBar) {
				searchBar.removeEventListener('input', (event) => {
					searchComunicadoBySearchValue(event.target.value);
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [firstFetch, fechaComunicados, history, showNavbar]);

	return (
		<ComunicadoCardContext.Provider
			value={{
				activeModal,
				setActiveModal,
				modalAction,
				setModalAction,
				updateComunicado,
				deleteComunicado,
				signComunicado,
			}}
		>
			<main className="father-container-view" id="father-container-view">
				{activeModal && <ComunicadoModal modalAction={modalAction} />}
				<div className="container" style={{ paddingTop: '35px' }}>
					<div className="row">
						<SortAndFilter
							orderComunicadosAsc={() =>
								getComunicados(
									setFechaComunicados,
									setFechaComunicadosAux,
									setFirstFetch,
									orderComunicadosByDate
								)
							}
							orderComunicadosDesc={() =>
								getComunicados(
									setFechaComunicados,
									setFechaComunicadosAux,
									setFirstFetch,
									orderComunicadosByDateDesc
								)
							}
							cleanFilters={cleanFilters}
							filterComunicadosByDate={filterComunicadosByDate}
							filterComunicadosByTag={filterComunicadosByTag}
							filterComunicadosByEmisor={filterComunicadosByEmisor}
						/>
						{fechaComunicados && fechaComunicadosAux.length > 0
							? // eslint-disable-next-line array-callback-return
							  fechaComunicadosAux.map((element) => {
									if (element.fecha !== undefined && element.comunicados.length > 0) {
										return (
											<FechaComunicado
												key={element.fecha}
												fecha={element.fecha}
												comunicados={element.comunicados}
											/>
										);
									}
							  })
							: 'No se encontraron resultados'}
					</div>
				</div>
			</main>
		</ComunicadoCardContext.Provider>
	);
}
