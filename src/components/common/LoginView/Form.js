import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios';

// Components
import Logo from '../../../assets/images/logo-escolar.png';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Icon } from 'rsuite';

// Styles
import 'rsuite/dist/styles/rsuite-default.css';

// Forms
const LoginForm = ({ changeForm, showPassword, seePassword }) => {
	const history = useHistory();

	return (
		<div className="form-content">
			<h2 className="form-title">Iniciar Sesión</h2>
			<img src={Logo} alt="schoolar-logo" className="form-logo" />
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
					setSubmitting(false);
					Axios.post('http://localhost:3001/Frontend_Comunicados_ET32/login', values).then((res) => {
						console.log();
						if (res.data.status === 'success') {
							res.data.email = values.email;
							localStorage.setItem('user-token', JSON.stringify(res.data.sessionID, res.data.email));
							localStorage.setItem('user-email', JSON.stringify(res.data.email));
							history.push('/home');
						} else {
							const messageContainer = document.getElementById('message-container');
							messageContainer.innerText = res.data;
							setTimeout(() => {
								messageContainer.innerText = '';
							}, 2500);
						}
					});
				}}
			>
				<Form className="login-form">
					<div>
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
						<div className="session-validate-message" id="message-container"></div>
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
						<div className="login-form-divisor" style={{ marginBottom: '0px', marginTop: '0px' }}>
							<div className="divisor-text">
								<p className="form-register-text">
									¿Aún no tenés una cuenta?{' '}
									<span onClick={() => changeForm('Register')}>Registrate</span>
								</p>
							</div>
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
					setSubmitting(false);
					Axios.post('http://localhost:3001/Frontend_Comunicados_ET32/register', values).then((res) => {
						console.log(res.data);
					});
				}}
			>
				<Form
					className="login-form row"
					style={{
						height: '900px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<div style={{ marginTop: '20px', padding: '0' }}>
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
										<option value="1">DNI</option>
										<option value="2">Libreta Cívica</option>
										<option value="3">Pasaporte</option>
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
					</div>
					<button type="submit" className="enter-btn" style={{ marginBottom: '20px' }}>
						<span className="enter-span">Continuar</span>
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
			<h2 className="form-title">Recuperar Contraseña</h2>
			<Formik
				initialValues={{
					documento: '',
					email: '',
				}}
				validate={(values) => {
					const errors = {};

					//? Validación de correo electrónico.
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					Axios.post('http://localhost:3001/Frontend_Comunicados_ET32/changePassword', values).then((res) => {
						console.log(res.data);
					});
				}}
			>
				<Form
					className="login-form row"
					style={{
						height: '900px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<div className="forgot-password-inputs-container" style={{ marginTop: '20px', padding: '0' }}>
						<div className="form-input-container">
							<Field
								className="login-form-input"
								type="text"
								name="documento"
								placeholder="Documento"
								required
							/>
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
					</div>
					<button type="submit" className="enter-btn" style={{ marginBottom: '20px' }}>
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
