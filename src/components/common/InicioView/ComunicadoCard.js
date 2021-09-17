import React from 'react';

export default function ComunicadoCard({ comunicado }) {
	console.log(comunicado);
	return (
		<div className="comunicado-card-container">
			<div className="comunicado-card-header">{comunicado.titulo}</div>
			<p>{comunicado.descripcion}</p>
		</div>
	);
}
