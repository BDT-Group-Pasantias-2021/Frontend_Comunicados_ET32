import React from 'react';

// Components

export default function SeenMarker({ estado, showComunicado }) {
	const TickIcon = () => {
		return (
			<div
				className="comunicado-seen-marker seen-marker-affirmative"
				title="Comunicado firmado"
				onClick={() => showComunicado()}
			>
				<svg className="seen-marker-icon" viewBox="0 0 512 512">
					<g>
						<g>
							<path
								d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0
                    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7
                    C514.5,101.703,514.499,85.494,504.502,75.496z"
							/>
						</g>
					</g>
				</svg>
			</div>
		);
	};

	const ExclamationMarkTickIcon = () => {
		return (
			<div
				className="comunicado-seen-marker seen-marker-pending"
				title="Comunicado pendiente"
				onClick={() => showComunicado()}
			>
				<svg className="seen-marker-icon" viewBox="0 0 512 512">
					<g>
						<path d="m256 422c-24.853 0-45 20.147-45 45s20.147 45 45 45 45-20.147 45-45-20.147-45-45-45z" />
						<path d="m256 0c-24.853 0-45 20.147-45 45v299c0 24.853 20.147 45 45 45s45-20.147 45-45v-299c0-24.853-20.147-45-45-45z" />
					</g>
				</svg>
			</div>
		);
	};

	return <>{estado ? <TickIcon /> : <ExclamationMarkTickIcon />}</>;
}
