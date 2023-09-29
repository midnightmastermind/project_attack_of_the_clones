import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";


import { login, oauthLogin } from "../slices/auth";
import { clearMessage } from "../slices/message";
import ExtraLoginOptions from "../components/ExtraLoginOptions";

// properties for Button component: login button
const loginButton = {
    style: {
        color: 'white',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '50px'
    },
    text: 'Login',
    type: 'submit',
    link: null /* this is test link; it works! @todo: change this link */
}

// properties for  Button component: sign up button
const signupButton = {
    style: {
        color: 'white',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '50px'
    },
    text: 'Sign Up',
    type: 'button',
    link: '/about' /* this is a test link; it works! @todo: change this link */
}


// login card style
const loginCardStyle = {
    margin: 'auto',
    border: '2px solid var(--light-blue)',
    padding: '20px 25px 30px',
    backgroundColor: '#f7f7f7',
    width: '100%',
    borderRadius: '3px',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const typeOfLogin = [
    "google",
    // "FACEBOOK",
    // "GITHUB",
    "microsoft",
    // "Twitter",
    "linkedin",
    // "Paypal",
    // "Instagram"
];

const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValue) => {
        const { username, password } = formValue;
        setLoading(true);

        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                navigate("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };


    const handleOauthLogin = (token, type) => {
        setLoading(true);

        dispatch(oauthLogin({ token, type }))
            .unwrap()
            .then(() => {
                navigate("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="w-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-dark-blue to-light-blue py-6">
                <h1 className="text-center text-white text-4xl md:text-8xl">Welcome!</h1>
            </div>

            {/* Page Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* Welcome Image */}
                <div className="flex justify-center md:px-24">
                    <img src="/welcome.jpg" alt="login welcome image" className="object-scale-down drop-shadow-xl px-10 m-0" />
                </div>

                {/* Card */}
                <div className="flex justify-center w-full px-10 md:px-24 md:py-8">
                    <div style={loginCardStyle}>
                        <h2 className="text-xl pb-4">If you are a returning user, log in here.</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleLogin}
                        >
                            <Form>
                                <div className="pb-3">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" type="text" className="input border border-light-blue p-2 w-full" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="bg-red-300 p-2 rounded-sm"
                                    />
                                </div>

                                <div className="pb-3">
                                    <label htmlForm="password">Password</label>
                                    <Field name="password" type="password" className="input border border-light-blue p-2 w-full" />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="bg-red-300 p-2 rounded-sm"
                                    />
                                </div>

                                <div className="flex flex-row">
                                    <Button props={loginButton} disabled={loading}>
                                        {loading && (
                                            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-blue"></span>
                                        )}
                                    </Button>

                                    <h2 className="text-xl px-3">
                                        <a href="" className="text-light-blue underline underline-offset-2">Forgot password?</a>
                                    </h2>
                                </div>

                                <h2 className="text-xl pt-6 pb-2">Don't have an account? Sign up here.</h2>

                                <Button props={signupButton} disabled={loading}>
                                    {loading && (
                                        <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-blue"></span>
                                    )}
                                </Button>

                            </Form>
                        </Formik>
                        <div className="extra-logins">
                            <ExtraLoginOptions authType="login" callBackFunction={handleOauthLogin} typeOfLogin={typeOfLogin} />
                        </div>
                    </div>
                </div>
            </div>

            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
