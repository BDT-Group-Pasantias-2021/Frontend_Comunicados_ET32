/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

// Hooks
import { ComunicadoCardContext } from '../../../hooks/useContext/ComunicadoCardContext';
import CategoryTag from './CategoryTag';

// Components
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function ComunicadoModal({ modalAction }) {
	const { activeModal, setActiveModal, setModalAction, signComunicado, updateComunicado } =
		useContext(ComunicadoCardContext);

	const ReadModalContent = () => {
		return (
			<div className="modal-container">
				<div className="modal-top-section">
					<div className="modal-tags-close">
						<div className="modal-etiquetas">
							{activeModal.etiquetas != null &&
								activeModal.etiquetas.map((tag) => (
									<CategoryTag key={tag.id_etiqueta} categoria={tag} tipo={'modal'} />
								))}
						</div>
						<div className="standard-icon-container" onClick={() => setActiveModal(null)}>
							<svg className="standard-icon" viewBox="0 0 512.001 512.001">
								<g>
									<g>
										<path
											d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
													L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
													c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
													l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
													L284.286,256.002z"
										/>
									</g>
								</g>
							</svg>
						</div>
					</div>
					<div className="modal-from-who">
						Comunicado por: <b>{activeModal.emisor}</b>
					</div>
					<div className="modal-content">
						<h4 className="modal-title">
							<b>{activeModal.titulo}</b>
						</h4>
						<textarea className="modal-text" defaultValue={activeModal.descripcion} disabled></textarea>
					</div>
				</div>
				<div className="modal-bottom-section">
					<div className="modal-comuncado-info">
						<div className="standard-icon-container standard-icon-container-margin">
							<svg className="standard-icon standard-icon-margin" viewBox="0 0 512 512">
								<g>
									<path d="m144 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m144 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m144 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m467 65h-36v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-130v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-130v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-36c-24.813 0-45 20.187-45 45v332c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45 0-9.682 0-323.575 0-332 0-24.813-20.187-45-45-45zm-437 45c0-8.271 6.729-15 15-15h36v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h130v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h130v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h36c8.271 0 15 6.729 15 15v59h-452zm437 347h-422c-8.271 0-15-6.729-15-15v-243h452v243c0 8.271-6.729 15-15 15z" />
								</g>
							</svg>
							<p className="standard-icon-label">{activeModal.renderFecha}</p>
						</div>
						<div className="standard-icon-container standard-icon-container-margin">
							<svg className="standard-icon standard-icon-margin" viewBox="0 0 512 512">
								<g>
									<g>
										<path
											d="M256.052,61.773L145.959,16.169c-3.675-1.521-7.805-1.521-11.48,0c-3.675,1.522-6.596,4.442-8.118,8.118L81.627,132.285
														L3.454,226.539c-3.155,3.805-4.233,8.919-2.884,13.673l42.436,149.457c1.252,4.411,4.453,8.007,8.689,9.762
														c1.843,0.764,3.794,1.142,5.74,1.142c2.526,0,5.044-0.638,7.307-1.899L200.43,323c4.316-2.407,7.17-6.786,7.629-11.707
														l11.376-121.926L264.17,81.372C267.34,73.719,263.706,64.944,256.052,61.773z M178.921,300.644l-91.12,50.817l38.828-93.74
														c3.17-7.653-0.464-16.429-8.118-19.599c-7.653-3.17-16.429,0.464-19.599,8.118l-38.829,93.742L31.586,239.613L99.1,158.212
														l44.823,18.565l44.823,18.566L178.921,300.644z M196.591,166.12l-58.626-24.282l-23.75-9.837l34.121-82.375l82.376,34.122
														L196.591,166.12z"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M497,274.172H336.334c-34.849,0-63.201,28.352-63.201,63.201c0,34.848,28.352,63.199,63.201,63.199
														c18.306,0,33.199,14.893,33.199,33.199c0,18.308-14.893,33.201-33.199,33.201H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h321.334
														c34.848,0,63.199-28.352,63.199-63.201c0-34.848-28.351-63.199-63.199-63.199c-18.307,0-33.201-14.894-33.201-33.199
														c0-18.308,14.894-33.201,33.201-33.201H497c8.284,0,15-6.716,15-15S505.284,274.172,497,274.172z"
										/>
									</g>
								</g>
							</svg>
							<p className="standard-icon-label">{activeModal.leido ? 'Firmado' : 'Pendiente'}</p>
							<div id="something"></div>
						</div>
					</div>
					<div className="modal-buttons">
						{activeModal.leido || (
							<div
								className="modal-sign-button"
								id="modal-sign-button"
								onClick={() => handleSignComunicado(activeModal.id_comunicaciones, activeModal.fecha)}
							>
								Marcar como firmado
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	const EditModalContent = () => {
		return (
			<div className="modal-container">
				<div className="modal-top-section">
					<div className="modal-tags-close">
						<div className="modal-etiquetas">
							{activeModal.categorias.map((tag) => (
								<CategoryTag key={tag.id_categoria} categoria={tag} tipo={'modal'} />
							))}
						</div>
						<div className="standard-icon-container" onClick={() => setActiveModal(null)}>
							<svg className="standard-icon" viewBox="0 0 512.001 512.001">
								<g>
									<g>
										<path
											d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
											L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
											c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
											l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
											L284.286,256.002z"
										/>
									</g>
								</g>
							</svg>
						</div>
					</div>
					<div className="modal-from-who">
						Comunicado por: <b>{activeModal.emisor}</b>
					</div>
					<div className="modal-content">
						<Formik
							initialValues={{
								titulo: activeModal.titulo,
								descripcion: activeModal.descripcion,
							}}
							validate={(values) => {
								const errors = {};
								/* //? Validación de correo electrónico.
											if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
												errors.email = 'Correo electrónico inválido';
											} */
								return errors;
							}}
							onSubmit={(values) => {
								handleUpdateComunicado(activeModal.id_comunicaciones, activeModal.fecha, values);
								/* Axios.post('http://192.168.43.121:3005/Frontend_Comunicados_ET32/login', values); */
							}}
						>
							<Form className="modal-form-data-container">
								<div className="form-input-container">
									<Field
										component="textarea"
										className="modal-title modal-title-edit"
										name="titulo"
									/>

									<ErrorMessage className="input-error" name="titulo" component="div" />
								</div>
								<div className="modal-text-edit">
									<Field component="textarea" className="modal-text-edit" name="descripcion" />

									<ErrorMessage className="input-error" name="descripcion" component="div" />
								</div>
								<button type="submit" className="enter-btn" id="btn-submit-form"></button>
							</Form>
						</Formik>
					</div>
				</div>
				<div className="modal-bottom-section">
					<div className="modal-comuncado-info">
						<div className="standard-icon-container standard-icon-container-margin">
							<svg className="standard-icon standard-icon-margin" viewBox="0 0 512 512">
								<g>
									<path d="m144 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m144 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m144 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m467 65h-36v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-130v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-130v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-36c-24.813 0-45 20.187-45 45v332c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45 0-9.682 0-323.575 0-332 0-24.813-20.187-45-45-45zm-437 45c0-8.271 6.729-15 15-15h36v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h130v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h130v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h36c8.271 0 15 6.729 15 15v59h-452zm437 347h-422c-8.271 0-15-6.729-15-15v-243h452v243c0 8.271-6.729 15-15 15z" />
								</g>
							</svg>
							<p className="standard-icon-label">{activeModal.renderFecha}</p>
						</div>
					</div>
					<div className="modal-buttons">
						<div className="modal-save-btn" id="modal-save-button" onClick={sendForm}>
							Guardar
						</div>
					</div>
				</div>
			</div>
		);
	};

	const InsertModalContent = () => {
		return (
			<div className="modal-container">
				<div className="modal-top-section">
					<div className="modal-tags-close">
						<div className="modal-etiquetas">[static]</div>
						<div className="standard-icon-container" onClick={() => setActiveModal(null)}>
							<svg className="standard-icon" viewBox="0 0 512.001 512.001">
								<g>
									<g>
										<path
											d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
											L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
											c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
											l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
											L284.286,256.002z"
										/>
									</g>
								</g>
							</svg>
						</div>
					</div>
					<div className="modal-from-who">
						Comunicado por: <b>[static]</b>
					</div>
					<div className="modal-content">
						<Formik
							initialValues={{
								emisor: '[Static]',
								titulo: '',
								descripcion: '',
								categorias: [],
							}}
							validate={(values) => {
								const errors = {};

								return errors;
							}}
							onSubmit={(values) => {
								alert(JSON.stringify(values, null, 2));
								/* handleUpdateComunicado(activeModal.id_comunicaciones, activeModal.fecha, values); */
								/* Axios.post('http://192.168.43.121:3005/Frontend_Comunicados_ET32/login', values); */
							}}
						>
							<Form className="modal-form-data-container">
								<div className="form-input-container">
									<Field
										component="textarea"
										className="modal-title modal-title-edit"
										name="titulo"
										placeholder="Escriba el título acá"
										required
									/>
									<ErrorMessage className="input-error" name="titulo" component="div" />
								</div>
								<div className="modal-text-edit">
									<Field
										component="textarea"
										className="modal-text-edit"
										name="descripcion"
										placeholder="Escriba el contenido del comunicado acá"
										required
									/>
									<ErrorMessage className="input-error" name="descripcion" component="div" />
								</div>
								<button type="submit" className="enter-btn" id="btn-submit-form"></button>
							</Form>
						</Formik>
					</div>
				</div>
				<div className="modal-bottom-section">
					<div className="modal-comuncado-info">
						<div className="standard-icon-container standard-icon-container-margin">
							<svg className="standard-icon standard-icon-margin" viewBox="0 0 512 512">
								<g>
									<path d="m144 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m144 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m144 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m272 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 249h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 313h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m400 377h-32c-8.284 0-15 6.716-15 15s6.716 15 15 15h32c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
									<path d="m467 65h-36v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-130v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-130v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-36c-24.813 0-45 20.187-45 45v332c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45 0-9.682 0-323.575 0-332 0-24.813-20.187-45-45-45zm-437 45c0-8.271 6.729-15 15-15h36v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h130v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h130v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h36c8.271 0 15 6.729 15 15v59h-452zm437 347h-422c-8.271 0-15-6.729-15-15v-243h452v243c0 8.271-6.729 15-15 15z" />
								</g>
							</svg>
							<p className="standard-icon-label">Hoy</p>
						</div>
					</div>
					<div className="modal-buttons">
						<div className="modal-save-btn" id="modal-save-button" onClick={sendForm}>
							Guardar
						</div>
					</div>
				</div>
			</div>
		);
	};

	const handleSignComunicado = (id, fecha) => {
		window.navigator.vibrate([50]);
		const signBtn = document.getElementById('modal-sign-button');

		signBtn.innerHTML =
			'<svg class="seen-marker-icon" viewBox="0 0 512 512"><g><g><path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z"/></g></g></svg>';
		signBtn.classList.add('modal-sign-button-active');
		setTimeout(() => {
			activeModal.leido = true;
			signComunicado(id, fecha);
		}, 700);
	};

	const handleUpdateComunicado = (id, fecha, comunicado) => {
		window.navigator.vibrate([50]);
		const signBtn = document.getElementById('modal-save-button');
		signBtn.innerHTML = 'Guardado satisfactoriamente ';
		signBtn.classList.add('modal-save-button-active');
		/* alert('Comunicado actualizado');
		setTimeout(() => {
			const signBtn = document.getElementById('modal-save-button');
			signBtn.innerHTML = 'Guardar';
			signBtn.classList.remove('modal-save-button-active');
		}, 2500);
		console.log(signBtn); */
		updateComunicado(id, fecha, comunicado);
	};

	const sendForm = () => {
		let mainForm = document.getElementById('btn-submit-form');
		mainForm.click();
	};

	useEffect(() => {
		if (activeModal.leido !== undefined) {
			if (!activeModal.leido) {
				const modal = document.getElementById(`modal-comunicado`);
				modal.classList.add('unread-comunicado');
			} else if (activeModal.leido) {
				const modal = document.getElementById(`modal-comunicado`);
				modal.classList.remove('unread-comunicado');
			}
		}
	});

	return (
		<>
			<div
				className="cards-overlay-mask"
				onClick={() => {
					setModalAction(false);
					setActiveModal(null);
				}}
			></div>
			<div className="modal-comunicado col-12 col-sm-11 col-md-8 col-lg-7" id={`modal-comunicado`}>
				{modalAction === 'read' ? (
					<ReadModalContent />
				) : modalAction === 'edit' ? (
					<EditModalContent />
				) : (
					modalAction === 'insert' && <InsertModalContent />
				)}
			</div>
		</>
	);
}
