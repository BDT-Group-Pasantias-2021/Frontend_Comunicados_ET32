import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

// Components
import GoogleIcon from '../../../assets/svgs/logo-google.svg';
import FacebookIcon from '../../../assets/svgs/logo-facebook.svg';

// Forms
const LoginForm = ({ changeForm }) => {
	return (
		<div className="form-content">
			<h2 className="form-title">Iniciar Sesión</h2>

			<div className="apis-container">
				<a class="api-btn" href=".">
					<img src={GoogleIcon} alt="google-icon" />
					Continuar con Google
				</a>
				<a class="api-btn" href=".">
					<img src={FacebookIcon} alt="facebook-icon" />
					Continuar con Facebook
				</a>
			</div>

			<div className="login-form-divisor">
				<div className="divisor-text">O</div>
			</div>

			<Formik
				initialValues={{ email: '', password: '' }}
				validate={(values) => {
					const errors = {};
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}

					if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.password)) {
						errors.password = 'Contraseña inválida';
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<form className="login-form" onSubmit={handleSubmit}>
						<div className="form-input-container">
							<input
								placeholder="Correo Electronico"
								type="email"
								name="email"
								className="login-form-input email-log"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								required
							/>
							{errors.email && touched.email && errors.email}
						</div>
						<div className="form-input-container">
							<input
								placeholder="Contraseña"
								type="password"
								name="password"
								className="login-form-input pass-log"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
							{errors.password && touched.password && errors.password}
						</div>
						<button type="submit" className="enter-btn" disabled={isSubmitting}>
							<span className="enter-span">Ingresar</span>
						</button>
						<div className="form-forgot-keep-container">
							<div className="form-keep-login">
								<input type="checkbox" name="keep-login"></input>
								<label className="form-keep-login-label" htmlFor="keep-login">
									Mantener sesión iniciada
								</label>
							</div>
							<a href="." className="form-forgot-password">
								Olvidaste tu contraseña?
							</a>
						</div>
						<div className="login-form-divisor" style={{ marginBottom: '0px' }}>
							<div className="divisor-text">
								<p className="form-register-text">
									Aún no tenés una cuenta? <span onClick={changeForm}>Registrate</span>
								</p>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

const RegisterForm = ({ changeForm }) => {
	return (
		<div className="form-content">
			<h2 className="form-title">Registrarse</h2>
			{/* <div className="login-form-divisor">
				<div className="divisor-text">O</div>
			</div> */}
			<Formik
				initialValues={{ email: '', password: '' }}
				validate={(values) => {
					const errors = {};
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}

					if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.password)) {
						errors.password = 'Contraseña inválida';
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
			>
				<Form>
					<form className="login-form">
						<div className="form-input-container">
							<Field
								className="login-form-input"
								type="text"
								name="nombre"
								placeholder="Nombre"
								required
							/>
							<ErrorMessage className="input-error" name="password" component="div" />
						</div>
						<div className="form-input-container">
							<Field
								className="login-form-input"
								type="text"
								name="apellido"
								placeholder="Apellido"
								required
							/>
							<ErrorMessage className="input-error" name="apellido" component="div" />
						</div>
						<div className="form-input-container">
							<Field
								className="login-form-input"
								type="email"
								name="email"
								placeholder="Correo Electronico"
								required
							/>
							<ErrorMessage className="input-error" name="email" component="div" />
						</div>
						<div className="form-input-container">
							<Field
								className="login-form-input"
								type="password"
								name="password"
								placeholder="Contraseña"
								required
							/>
							<ErrorMessage className="input-error" name="password" component="div" />
						</div>
						<div className="form-input-container">
							<Field
								className="login-form-input"
								type="password"
								name="confirm-password"
								placeholder="Confirmar Contraseña"
								required
							/>
							<ErrorMessage className="input-error" name="confirm-password" component="div" />
						</div>
						<button type="submit" className="enter-btn">
							<span className="enter-span">Registrarse</span>
						</button>
						<div className="login-form-divisor" style={{ marginBottom: '0px' }}>
							<div className="divisor-text">
								<p className="form-register-text">
									Ya tenés una cuenta? <span onClick={changeForm}>Iniciá Sesión</span>
								</p>
							</div>
						</div>
					</form>

					<button id="btn-submit-form" type="submit" className="invisible-btn"></button>
				</Form>
			</Formik>
		</div>
	);
};

export default function Formulario() {
	const [formulario, setFormulario] = useState(true);

	function changeForm() {
		setFormulario(!formulario);
	}

	return (
		<div className="form-section">
			{formulario ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} />}
		</div>
	);
}
