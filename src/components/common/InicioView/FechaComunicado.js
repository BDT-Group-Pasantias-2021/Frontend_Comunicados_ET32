import React from 'react';

// Components
import ComunicadoCard from './ComunicadoCard';

export default function FechaComunicado({ fecha, comunicados }) {
	const currentDate = () => {
		const tempCurDate = new Date();
		const curDate = `${tempCurDate.getFullYear()}/${tempCurDate.getMonth() + 1}/${tempCurDate.getDate()}`;
		return curDate;
	};

	console.log(currentDate());
	const fechaFormat = new Date(fecha);
	const fechaEsp = fechaFormat.toLocaleDateString(undefined, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="date-comunicados-container col-md-12">
			<h4 className="date-comunicados-header">{fecha === currentDate ? 'Hoy' : fechaEsp}</h4>
			<div className="date-comunicados-cards">
				{comunicados.map((comunicado, index) => (
					<ComunicadoCard key={index} comunicado={comunicado} />
				))}
			</div>
		</div>
	);
}
