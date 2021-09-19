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
		const fechaFormat = new Date(fecha);
		const fechaEspFormat = fechaFormat.toLocaleDateString(undefined, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		const finalFechaEsp = fechaEspFormat.charAt(0).toUpperCase() + fechaEspFormat.slice(1);
		return finalFechaEsp;
	};

	const renderHeader = fecha === currentDate ? 'Hoy' : getFormatedDate();

	return (
		<div className="date-comunicados-container col-11 col-sm-12">
			<h4 className="date-comunicados-header">{renderHeader}</h4>
			<div className="date-comunicados-cards">
				{comunicados.map((comunicado, index) => (
					<ComunicadoCard key={index} comunicado={comunicado} fecha={renderHeader} />
				))}
			</div>
		</div>
	);
}
