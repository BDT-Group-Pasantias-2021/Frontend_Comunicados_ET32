import React, { useEffect } from 'react';

export default function AccountConfig({ showNavbar, homePageLocation }) {
	useEffect(() => {
		//* Mostrar barras de navegación
		showNavbar(true);
		homePageLocation(true);
	});

	return <div>asd</div>;
}
