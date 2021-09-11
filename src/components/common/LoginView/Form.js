import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

// Components
import GoogleIcon from '../../../assets/svgs/logo-google.svg';
import FacebookIcon from '../../../assets/svgs/logo-facebook.svg';

// Forms
const LoginForm = ({ changeForm, showPassword, seePassword }) => {
	return (
		<div className="form-content">
			<h2 className="form-title">Iniciar Sesión</h2>

			<div className="apis-container">
				<a className="api-btn" href=".">
					<img src={GoogleIcon} alt="google-icon" />
					Continuar con Google
				</a>
				<a className="api-btn" href=".">
					<img src={FacebookIcon} alt="facebook-icon" />
					Continuar con Facebook
				</a>
			</div>

			<div className="login-form-divisor">
				<div className="divisor-text">O</div>
			</div>

			<Formik
				initialValues={{ email: '', contraseña: '' }}
				validate={(values) => {
					const errors = {};
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}

					if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.contraseña)) {
						errors.contraseña = 'Contraseña inválida';
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
				<Form className="login-form">
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
						<div className="form-password-container login-form-input">
							<Field
								className="form-password-input"
								type={seePassword ? 'text' : 'password'}
								name="contraseña"
								placeholder="Contraseña"
								required
							/>
							<Icon
								className="form-eye-icon"
								icon={seePassword ? 'eye-slash' : 'eye'}
								onClick={showPassword}
							/>
						</div>
						<ErrorMessage className="input-error" name="contraseña" component="div" />
					</div>
					<button type="submit" className="enter-btn">
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
				</Form>
			</Formik>
		</div>
	);
};

const RegisterForm = ({ changeForm, showPassword, seePassword }) => {
	return (
		<div className="form-content">
			<h2 className="form-title">Registrarse</h2>
			<Formik
				initialValues={{
					nombre: '',
					apellido: '',
					tipo_documento: '',
					identificador: '',
					email: '',
					contraseña: '',
					confirmar_contraseña: '',
				}}
				validate={(values) => {
					const errors = {};

					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}

					if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.contraseña)) {
						errors.contraseña = 'Contraseña inválida';
					}

					if (values.contraseña !== values.confirmar_contraseña) {
						errors.confirmar_contraseña = 'Las contraseñas no coinciden';
					}

					if (/[a-zA-Z]/.test(values.identificador)) {
						errors.identificador = 'Identificador inválido';
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
				<Form className="login-form row">
					<div className="form-double-container">
						<div className="form-input-container form-double-input">
							<Field
								style={{ marginTop: '0px' }}
								className="login-form-input"
								type="text"
								name="nombre"
								placeholder="Nombre"
								required
							/>
							<ErrorMessage className="input-error" name="nombre" component="div" />
						</div>
						<div className="form-input-container form-double-input">
							<Field
								style={{ marginTop: '0px' }}
								className="login-form-input"
								type="text"
								name="apellido"
								placeholder="Apellido"
								required
							/>
							<ErrorMessage className="input-error" name="apellido" component="div" />
						</div>
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
					<div className="form-double-container">
						<div className="form-input-container form-double-input">
							<Field
								className="login-form-input"
								as="select"
								name="tipo_documento"
								placeholder="Tipo de documento"
								required
							>
								<option value="" defaultValue disabled hidden>
									Tipo de documento
								</option>
								<option value="dni">DNI</option>
								<option value="libreta_civica">Libreta Cívica</option>
								<option value="pasaporte">Pasaporte</option>
							</Field>
						</div>
						<div className="form-input-container form-double-input">
							<Field
								className="login-form-input"
								type="number"
								name="identificador"
								placeholder="Identificador"
								required
							/>
							<ErrorMessage className="input-error" name="identificador" component="div" />
						</div>
					</div>
					<div className="form-input-container">
						<div className="form-password-container login-form-input">
							<Field
								className="form-password-input"
								type={seePassword ? 'text' : 'password'}
								name="contraseña"
								placeholder="Contraseña"
								required
							/>
							<Icon
								className="form-eye-icon"
								icon={seePassword ? 'eye-slash' : 'eye'}
								onClick={showPassword}
							/>
						</div>
						<ErrorMessage className="input-error" name="contraseña" component="div" />
					</div>
					<div className="form-input-container">
						<Field
							className="login-form-input"
							type={seePassword ? 'text' : 'password'}
							name="confirmar_contraseña"
							placeholder="Confirmar Contraseña"
							required
						/>
						<ErrorMessage className="input-error" name="confirmar_contraseña" component="div" />
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
				</Form>
			</Formik>
		</div>
	);
};

export default function Formulario() {
	const [formulario, setFormulario] = useState(true);
	const [seePassword, setSeePassword] = useState(false);

	function changeForm() {
		setFormulario(!formulario);
	}

	function showPassword() {
		setSeePassword(!seePassword);
	}

	return (
		<div className="form-section col-10 col-sm-8 col-md-5 col-lg-4">
			{formulario ? (
				<LoginForm changeForm={changeForm} showPassword={showPassword} seePassword={seePassword} />
			) : (
				<RegisterForm changeForm={changeForm} showPassword={showPassword} seePassword={seePassword} />
			)}
		</div>
	);
}
