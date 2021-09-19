import React from 'react';

// Components
import ComunicadoCard from './ComunicadoCard';

export default function FechaComunicado({ fecha, comunicados }) {
	const currentDate = () => {
		const tempCurDate = new Date();
		const curDate = `${tempCurDate.getFullYear()}/${tempCurDate.getMonth() + 1}/${tempCurDate.getDate()}`;
		return curDate;
	};

	const getFormatedDate = () => {
		// sumar un dia a la fecha
		const tempDate = new Date(fecha);
		const date = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate() + 1}`;
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

	const renderDate = fecha === currentDate ? 'Hoy' : getFormatedDate();

	return (
		<div className="date-comunicados-container col-11 col-sm-12">
			<h4 className="date-comunicados-header">{renderDate}</h4>
			<div className="date-comunicados-cards">
				{comunicados.map((comunicado, index) => (
					<ComunicadoCard key={index} comunicado={comunicado} fechas={{ renderDate, fecha }} />
				))}
			</div>
		</div>
	);
}
