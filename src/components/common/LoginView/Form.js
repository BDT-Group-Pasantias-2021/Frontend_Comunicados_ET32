import React from 'react'
import { Formik } from 'formik';
import { Link } from "react-router-dom";

// Components
import GoogleIcon from '../../../assets/svgs/logo-google.svg'
import FacebookIcon from '../../../assets/svgs/logo-facebook.svg'

export default function Form() {
    return (
        <div className="form-section">
            <div className="form-content">
                <h2 className="form-title">Iniciar Sesión</ h2>
                
                <div className="apis-container">
                    <a class="api-btn" href="">
                        <img src={ GoogleIcon } alt="google-icon" />
                        Continuar con Google
                    </a>
                    <a class="api-btn" href="">
                        <img src={ FacebookIcon } alt="facebook-icon" />
                        Continuar con Facebook
                    </a>
                </div>

                <div className="login-form-divisor">
                    <div className="divisor-text">O</div>
                </div>
                
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
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
                    <form onSubmit={handleSubmit}>
                        <label for="email" className="lab-email">
                        Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="login email-log"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                        
                        <label for="password" className="lab-pass">
                        Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="login pass-log"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <div className="container-btn">
                            <button type="submit" className="enter-btn" disabled={isSubmitting}>
                                <span className="enter-span">Ingresar</span>
                            </button>
                        </div>
                    </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


