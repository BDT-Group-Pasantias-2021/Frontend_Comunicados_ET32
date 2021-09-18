import React, { useEffect, useState } from 'react';

// Styles
import '../../css/home.css';
import { ComunicadoCardContext } from '../../hooks/useContext/ComunicadoCardContext';

// Components
import FechaComunicado from '../common/InicioView/FechaComunicado';

const ComunicadosJSON = [
	{
		fecha: '10-08-2021',
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
						color: '#a8a8a8',
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
				leido: false,
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
						color: '#a8a8a8',
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
						color: '#a8a8a8',
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

export default function Inicio() {
	const [fechaComunicados, setFechaComunicados] = useState([]);
	const [comunicadosAñadidos, setComunicadosAñadidos] = useState(false);
	//const [activeOverlay, setActiveOverlay] = useState(false);

	useEffect(() => {
		if (!comunicadosAñadidos) {
			setFechaComunicados(ComunicadosJSON);
			setComunicadosAñadidos(true);
		}
	}, [comunicadosAñadidos, fechaComunicados]);

	return (
		<ComunicadoCardContext.Provider
			value={
				{
					/* activeOverlay, setActiveOverlay */
				}
			}
		>
			<main className="father-container-view">
				<div className="container" style={{ paddingTop: '35px' }}>
					<div className="row">
						<div className="date-comunicados-container col-md-12">
							<h4 className="date-comunicados-header">Hoy</h4>
							<div className="date-comunicados-cards">
								<div className="comunicado-card-container" id={`comunicado-card-container`}>
									<div className="comunicado-card-header">
										<div className="comunicado-card-title">a</div>
										<div className="comunicado-card-functions">
											<svg className="functions-icon" id="Capa_1" viewBox="0 0 515.555 515.555">
												<path d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
												<path d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
												<path d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
											</svg>
										</div>
									</div>
									<p className="comunicado-card-body">a</p>
								</div>
							</div>
						</div>
						{fechaComunicados.map((element) => (
							<FechaComunicado
								key={element.fecha}
								fecha={element.fecha}
								comunicados={element.comunicados}
							/>
						))}
					</div>
				</div>
			</main>
		</ComunicadoCardContext.Provider>
	);
}
