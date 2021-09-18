import React from 'react';

// Components
import ComunicadoCard from './ComunicadoCard';

export default function FechaComunicado({ fecha, comunicados }) {
	const fechaFormat = new Date(fecha);
	const fechaEsp = fechaFormat.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

	return (
		<div className="date-comunicados-container col-md-12">
			<h4 className="date-comunicados-header">{fechaEsp}</h4>
			<div className="date-comunicados-cards">
				{comunicados.map((comunicado, index) => (
					<ComunicadoCard key={index} comunicado={comunicado} />
				))}
			</div>
		</div>
	);
}
