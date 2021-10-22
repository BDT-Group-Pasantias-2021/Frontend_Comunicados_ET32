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

const ComunicadosJSON = [
	{
		fecha: '2021-09-18',
		comunicados: [
			{
				id_comunicaciones: 6,
				emisor: 'Gustavo Garcia',
				titulo: 'Asistencias normales',
				descripcion:
					'Estimadas Familias: \nA partir del 5/7 los estudiantes concurrirán de acuerdo al cronograma de burbujas establecido, respetando los protocolos vigentes.\nDurante esas dos semanas intensificarán los aprendizajes 2020 para poder tener aprobado dicho año\nEquipo de conducción\n\nSaludos, Gustavo García',
				leido: false,
				categorias: [
					{
						id_categoria: 1,
						nombre: 'General',
						color: '#121212',
					},
					{
						id_categoria: 2,
						nombre: 'Académico',
						color: '#44abff',
					},
					{
						id_categoria: 3,
						nombre: 'Urgente',
						color: '#ff4242',
					},
				],
			},
		],
	},
	{
		fecha: '2021-10-08',
		comunicados: [
			{
				id_comunicaciones: 5,
				emisor: 'Gustavo Garcia',
				titulo: 'Compartimos con ustedes el nuevo protocolo de fecha 16/09/2021 para su conocimiento como así también el encuadre de caso sospechoso y sus indicaciones. Les recordamos que el 21/09 en conmemoración del día del estudiante  hay asueto escolar. Saludos cordiales.',
				descripcion:
					'Compartimos con ustedes el nuevo protocolo de fecha 16/09/2021 para su conocimiento como así también el encuadre de caso sospechoso y sus indicaciones. Les recordamos que el 21/09 en conmemoración del día del estudiante  hay asueto escolar. Saludos cordiales.',
				leido: false,
				categorias: [
					{
						id_categoria: 1,
						nombre: 'General',
						color: '#121212',
					},
					{
						id_categoria: 3,
						nombre: 'Urgente',
						color: '#ff4242',
					},
				],
			},
		],
	},
	{
		fecha: '2021-07-03',
		comunicados: [
			{
				id_comunicaciones: 4,
				emisor: 'Gustavo Garcia',
				titulo: 'Comunicaciones',
				descripcion:
					'Familias\n\nA partir del 20/9 iniciaremos la semana 1 nuevamente para los trayectos artísticos.\nCon relación al bachiller les comunicamos que desde el 20/9 la presencialidad será completa de lunes a viernes para el TM y el TT, las burbujas pasarán a ser únicas y se utilizarán aulas de movimiento para evitar los espacios reducidos. Algunos grupos transitarán jornada completa en ciertas semanas pudiendo utilizar los espacios abiertos de la escuela para almorzar. Recordamos que seguimos transitando una pandemia y que los protocolos siguen vigentes a la fecha.<br>Saludos cordiales\\\nEquipo de conducción',
				leido: true,
				categorias: [
					{
						id_categoria: 2,
						nombre: 'Académico',
						color: '#44abff',
					},
				],
			},
		],
	},
	{
		fecha: '2021-06-28',
		comunicados: [
			{
				id_comunicaciones: 3,
				emisor: 'Gustavo Garcia',
				titulo: 'Comunicaciones',
				descripcion: 'En el día de la fecha concurrirán a la escuela personal de salud a realizar testeos.',
				leido: false,
				categorias: [
					{
						id_categoria: 1,
						nombre: 'General',
						color: '#121212',
					},
				],
			},
		],
	},
	{
		fecha: '2021-05-09',
		comunicados: [
			{
				id_comunicaciones: 2,
				emisor: 'Gustavo Garcia',
				titulo: 'Comunicaciones',
				descripcion: 'En el día de la fecha concurrirán a la escuela personal de salud a realizar testeos.',
				leido: true,
				categorias: [
					{
						id_categoria: 1,
						nombre: 'General',
						color: '#121212',
					},
				],
			},
			{
				id_comunicaciones: 1,
				emisor: 'Natacha Peppe',
				titulo: 'Desgracia en el taller',
				descripcion: 'Hubo un problema con la fresadora y palmó un pibe',
				leido: true,
				categorias: [
					{
						id_categoria: 3,
						nombre: 'Urgente',
						color: '#ff4242',
					},
				],
			},
		],
	},
];

export default function Inicio({ showNavbar }) {
	const [fechaComunicados, setFechaComunicados] = useState([]);
	const [comunicadosAñadidos, setComunicadosAñadidos] = useState(false);
	const [activeModal, setActiveModal] = useState(null);
	const [modalAction, setModalAction] = useState('read');

	const deleteComunicado = (id, selectedFecha) => {
		const confirmState = window.confirm('¿Estás seguro de eliminar este comunicado?');
		if (confirmState) {
			const newFechaComunicados = fechaComunicados.map((element) => {
				if (element.fecha === selectedFecha) {
					const comunicados = element.comunicados.filter((comunicado) => comunicado.id_comunicaciones !== id);
					return { fecha: element.fecha, comunicados };
				}
				return element;
			});
			setFechaComunicados(newFechaComunicados);
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
		const searchComunicadoBySearchValue = (value) => {
			console.log(value);
			const newFechaComunicados = fechaComunicados.map((element) => {
				const comunicados = element.comunicados.map((comunicado) => {
					if (
						comunicado.titulo.toLowerCase().includes(value.toLowerCase()) ||
						comunicado.descripcion.toLowerCase().includes(value.toLowerCase())
					) {
						/* console.log(comunicado); */
						return { ...comunicado };
					}
					return comunicado;
				});
				return { fecha: element.fecha, comunicados };
			});
			setFechaComunicados(newFechaComunicados);
		};

		//* Mostrar barras de navegación
		showNavbar(true);
		const userToken = localStorage.getItem('user-token');
		const emailToken = localStorage.getItem('user-email');
		if (!userToken || !emailToken) {
			history.push('/');
		}

		if (!comunicadosAñadidos) {
			setFechaComunicados(ComunicadosJSON);
			setComunicadosAñadidos(true);
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
				event.preventDefault();
				event.stopPropagation();
				searchComunicadoBySearchValue(searchBar.value);
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
					event.preventDefault();
					event.stopPropagation();
					searchComunicadoBySearchValue(searchBar.value);
				});
			}
		};
	}, [comunicadosAñadidos, fechaComunicados, history, showNavbar]);

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
						<SortAndFilter />
						{/* eslint-disable-next-line array-callback-return */}
						{fechaComunicados.map((element) => {
							if (element.fecha !== undefined && element.comunicados.length > 0) {
								return (
									<FechaComunicado
										key={element.fecha}
										fecha={element.fecha}
										comunicados={element.comunicados}
									/>
								);
							}
						})}
					</div>
				</div>
			</main>
		</ComunicadoCardContext.Provider>
	);
}
