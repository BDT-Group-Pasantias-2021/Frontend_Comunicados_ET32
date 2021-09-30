import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// Components
import Form from '../common/LoginView/Form.js';

// Styles
import '../../css/login-view.css';

export default function Login({ hideNavbar }) {
	const [loadContent, setLoadContent] = useState(false);
	let history = useHistory();

	//* Ocultar barras de navegación
	hideNavbar(true);

	useEffect(() => {
		const token = localStorage.getItem('user-token');
		if (token) {
			alert('Borrá el token de sesión');
			history.push('/home');
		} else {
			setLoadContent(true);
		}
	}, [history]);

	return (
		loadContent && (
			<main className="login-view">
				<div className="background-login-layout"></div>
				<div className="background-container row">
					<Form />
				</div>
			</main>
		)
	);
}
