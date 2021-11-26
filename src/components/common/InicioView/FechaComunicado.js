import React from 'react';

// Components
import ComunicadoCard from './ComunicadoCard';

export default function FechaComunicado({ fecha, comunicados }) {
	const currentDate = (resta = 0) => {
		let tempCurDate = new Date();
		tempCurDate.setDate(tempCurDate.getDate() - resta);
		return tempCurDate;
	};

	const getFormatedDate = (vanillaFecha) => {
		// sumar un dia a la fecha
		const tempDate = new Date(vanillaFecha);
		const date = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
		const fechaFormat = new Date(date);

		const fechaEspFormat = fechaFormat.toLocaleDateString(undefined, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
		const finalFechaEsp = fechaEspFormat.charAt(0).toUpperCase() + fechaEspFormat.slice(1);
		return finalFechaEsp;
	};

	const renderDate =
		getFormatedDate(fecha) === getFormatedDate(currentDate(0))
			? 'Hoy'
			: getFormatedDate(fecha) === getFormatedDate(currentDate(1))
				? 'Ayer'
				: getFormatedDate(fecha);

	return (
		<div className="date-comunicados-container col-11 col-sm-12 col-md-10">
			<h4 className="date-comunicados-header">{renderDate}</h4>
			<div className="date-comunicados-cards">
				{comunicados.map((comunicado) => (
					<ComunicadoCard
						key={comunicado.id_comunicaciones}
						comunicado={comunicado}
						fechas={{ renderDate, fecha }}
					/>
				))}
			</div>
		</div>
	);
}
