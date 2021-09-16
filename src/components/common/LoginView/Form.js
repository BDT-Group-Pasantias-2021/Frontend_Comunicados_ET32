/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

// Components
import GoogleIcon from '../../../assets/svgs/logo-google.svg';
import FacebookIcon from '../../../assets/svgs/logo-facebook.svg';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Icon } from 'rsuite';

// Styles
import 'rsuite/dist/styles/rsuite-default.css';
// Forms
const LoginForm = ({ changeForm, showPassword, seePassword }) => {
	const responseGoogle = (response) => {
		console.log(response.profileObj);
	};

	const responseFacebook = (response) => {
		console.log(response);
	};

	useEffect(() => {
		const googleLoginContainer = document.getElementById('google-login-container');
		const facebookLoginContainer = document.getElementById('facebook-login-container');

		facebookLoginContainer.firstChild.style.width = '100%';
		facebookLoginContainer.firstChild.firstChild.innerHTML = `<img src=${FacebookIcon} alt="facebook-icon" />
		Continuar con Facebook`;
		googleLoginContainer.firstChild.innerHTML = `<img src=${GoogleIcon} alt="google-icon" />Continuar con Google`;

		setInterval(() => {
			googleLoginContainer.firstChild.removeAttribute('style');
		});
	});

	return (
		<div className="form-content">
			<h2 className="form-title">Iniciar Sesión</h2>

			<div className="apis-container">
				<span className="api-btn" id="google-login-container">
					<GoogleLogin
						clientId="1053805853505-te1vo1l4tsfeg9ck2ip21175rph9c6hc.apps.googleusercontent.com"
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
						cookiePolicy={'single_host_origin'}
						className="api-btn"
					/>
				</span>
				<span className="api-btn" id="facebook-login-container">
					<FacebookLogin
						appId="548174133074419"
						autoLoad={false}
						fields="name,email,picture"
						callback={responseFacebook}
						cssClass="api-btn"
					/>
				</span>
			</div>

			<div className="login-form-divisor">
				<div className="divisor-text">O</div>
			</div>

			<Formik
				initialValues={{ email: '', password: '' }}
				validate={(values) => {
					const errors = {};
					//? Validación de correo electrónico.
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
					/* if (insertData) {
						Axios.post("http://localhost:3001/Rasn/admin/animales/nuevo-animal", values).then((res) => {
							console.log(res.data);
						}).then(alert("Registrado ingresado"));	
					} else {
						Axios.post("http://localhost:3001/Rasn/admin/animales/actualizar-animal", values).then((res) => {
							console.log(res.data);
						}).then(alert("Registro actualizado"));
					} */
				}}
			>
				<Form className="login-form">
					<div className="form-input-container">
						<Field
							className="login-form-input"
							style={{ marginTop: '0px' }}
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
								name="password"
								placeholder="Contraseña"
								required
							/>
							<Icon
								className="form-eye-icon"
								icon={seePassword ? 'eye-slash' : 'eye'}
								onClick={showPassword}
							/>
						</div>
						<ErrorMessage className="input-error" name="password" component="div" />
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
						<span className="form-forgot-password" onClick={() => changeForm('changePassword')}>
							¿Olvidaste tu contraseña?
						</span>
					</div>
				</Form>
			</Formik>
			<div className="login-form-divisor" style={{ marginBottom: '0px', marginTop: '0px' }}>
				<div className="divisor-text">
					<p className="form-register-text">
						¿Aún no tenés una cuenta? <span onClick={() => changeForm('Register')}>Registrate</span>
					</p>
				</div>
			</div>
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
					documento: '',
					email: '',
					password: '',
					confirmar_contraseña: '',
				}}
				validate={(values) => {
					const errors = {};

					//? Validación de correo electrónico.
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}

					//? Validaciones de longitud (entre 8 y 24) y coincidencias de contraseñas. Debe incluir
					//? al menos una mayuscula, una minuscula, un número y un caracter especial.
					if (
						!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_\\`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_\\`{|}~]{8,24}/.test(
							values.password
						)
					) {
						errors.password =
							'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.';
					}
					//? Validaciones de contraseñas coincidentes.
					if (values.password !== values.confirmar_contraseña) {
						errors.confirmar_contraseña = 'Las contraseñas no coinciden';
					}

					//? Validaciones de longitud y caracteres del documento correspondiente al documento seleccionado.
					if (values.tipo_documento === 'dni' && values.documento.length !== 8) {
						errors.documento = 'El numero de DNI debe tener 8 digitos.';
					} else if (
						values.tipo_documento === 'libreta_civica' &&
						(values.documento.length < 4 || values.documento.length > 8)
					) {
						errors.documento = 'El numero de Libreta Civica debe tener entre 4 y 8 digitos';
					} else if (values.tipo_documento === 'pasaporte' && values.documento.length !== 9) {
						errors.documento = 'El numero de Pasaporte debe tener 9 digitos.';
					}
					if (values.tipo_documento === 'dni' || values.tipo_documento === 'libreta_civica') {
						if (/[a-zA-Z]/.test(values.documento)) {
							errors.documento = 'Documento inválido';
						}
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
						<div className="form-double-inputs-container">
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
						<div className="form-double-inputs-container">
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
									type="text"
									name="documento"
									placeholder="Documento"
									required
								/>
							</div>
						</div>
						<div className="form-double-error">
							<ErrorMessage className="input-error" name="documento" component="div" />
						</div>
					</div>
					<div className="form-input-container">
						<div className="form-password-container login-form-input">
							<Field
								className="form-password-input"
								type={seePassword ? 'text' : 'password'}
								name="password"
								placeholder="Contraseña"
								required
							/>
							<Icon
								className="form-eye-icon"
								icon={seePassword ? 'eye-slash' : 'eye'}
								onClick={showPassword}
							/>
						</div>
						<ErrorMessage className="input-error" name="password" component="div" />
					</div>
					<div className="form-input-container">
						<Field
							className="login-form-input"
							type={seePassword ? 'text' : 'password'}
							name="confirmar_contraseña"
							placeholder="Confirmar contraseña"
							required
						/>
						<ErrorMessage className="input-error" name="confirmar_contraseña" component="div" />
					</div>
					<button type="submit" className="enter-btn">
						<span className="enter-span">Registrarse</span>
					</button>
				</Form>
			</Formik>
			<div className="login-form-divisor" style={{ marginBottom: '0px' }}>
				<div className="divisor-text">
					<p className="form-register-text">
						¿Ya tenés una cuenta? <span onClick={() => changeForm('Login')}>Iniciá Sesión</span>
					</p>
				</div>
			</div>
		</div>
	);
};

const ChangePassword = ({ changeForm }) => {
	return (
		<div className="form-content">
			{/* <div className="form-super-container"> */}
			<h2 className="form-title">Cambiar Contraseña</h2>
			<Formik
				initialValues={{
					nombre: '',
					apellido: '',
					tipo_documento: '',
					documento: '',
					email: '',
					password: '',
					confirmar_contraseña: '',
				}}
				validate={(values) => {
					const errors = {};

					//? Validación de correo electrónico.
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}

					//? Validaciones de longitud y caracteres del documento correspondiente al documento seleccionado.
					if (values.tipo_documento === 'dni' && values.documento.length !== 8) {
						errors.documento = 'El numero de DNI debe tener 8 digitos.';
					} else if (
						values.tipo_documento === 'libreta_civica' &&
						(values.documento.length < 4 || values.documento.length > 8)
					) {
						errors.documento = 'El numero de Libreta Civica debe tener entre 4 y 8 digitos';
					} else if (values.tipo_documento === 'pasaporte' && values.documento.length !== 9) {
						errors.documento = 'El numero de Pasaporte debe tener 9 digitos.';
					}
					if (values.tipo_documento === 'dni' || values.tipo_documento === 'libreta_civica') {
						if (/[a-zA-Z]/.test(values.documento)) {
							errors.documento = 'documento inválido';
						}
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
						<div className="form-double-inputs-container">
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
									type="text"
									name="documento"
									placeholder="documento"
									required
								/>
							</div>
						</div>
						<div className="form-double-error">
							<ErrorMessage className="input-error" name="documento" component="div" />
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

					<button type="submit" className="enter-btn">
						<span className="enter-span">Continuar</span>
					</button>
				</Form>
			</Formik>
			<div className="login-form-divisor" style={{ marginBottom: '0px' }}>
				<div className="divisor-text">
					<p className="form-register-text">
						¿Pudiste recordar la contraseña? <span onClick={() => changeForm('Login')}>Iniciá Sesión</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default function Formulario() {
	const [formulario, setFormulario] = useState('Login');
	const [seePassword, setSeePassword] = useState(false);

	function changeForm(typeForm) {
		setFormulario(typeForm);
	}

	function showPassword() {
		setSeePassword(!seePassword);
	}

	return (
		<div className="form-section col-10 col-sm-8 col-md-5 col-lg-4">
			{formulario === 'Login' ? (
				<LoginForm changeForm={changeForm} showPassword={showPassword} seePassword={seePassword} />
			) : formulario === 'Register' ? (
				<RegisterForm changeForm={changeForm} showPassword={showPassword} seePassword={seePassword} />
			) : (
				<ChangePassword changeForm={changeForm} />
			)}
		</div>
	);
}
