import React, { useEffect, useState } from 'react';

// Styles
import '../../css/home.css';
import { ComunicadoCardContext } from '../../hooks/useContext/ComunicadoCardContext';

// Components
import FechaComunicado from '../common/InicioView/FechaComunicado';
import ComunicadoModal from '../common/InicioView/ComunicadoModal';
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
	const [editModal, setEditModal] = useState(false);

	//* Mostrar barras de navegación
	showNavbar(true);

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

	// function to mark firma as true in a comunicado
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

	useEffect(() => {
		if (!comunicadosAñadidos) {
			setFechaComunicados(ComunicadosJSON);
			setComunicadosAñadidos(true);
		}
	}, [comunicadosAñadidos, fechaComunicados]);

	return (
		<ComunicadoCardContext.Provider
			value={{
				activeModal,
				setActiveModal,
				editModal,
				setEditModal,
				deleteComunicado,
				signComunicado,
			}}
		>
			<main className="father-container-view">
				{activeModal && <ComunicadoModal editarModal={editModal} />}
				<div className="container" style={{ paddingTop: '35px' }}>
					<div className="row">
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
