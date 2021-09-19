import React, { useContext } from 'react';

// Hooks
import { ComunicadoCardContext } from '../../../hooks/useContext/ComunicadoCardContext';

// Components

export default function ComunicadoModal() {
	const { activeComunicado, setActiveComunicado } = useContext(ComunicadoCardContext);

	return (
		<>
			<div className="cards-overlay-mask" onClick={() => setActiveComunicado(null)}></div>
			<div className="modal-comunicado col-12 col-sm-10 col-md-7 col-lg-6">{activeComunicado.descripcion}</div>
		</>
	);
}
