import React from 'react';

// Components
import Form from '../common/LoginView/Form.js';

// Styles
import '../../css/login-view.css';

export default function Login() {
	return (
		<main className="login-view">
			<div className="background-login-layout"></div>
			<div className="background-container row">
				<Form />
			</div>
		</main>
	);
}
