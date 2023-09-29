/**
 * This code contains a series of functions for interacting with an authentication API.
 * These functions include registering a new user, logging in, and logging out.
 */
import axios from "axios";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const registerOAuth = (token, type) => {
    return axios.post(API_URL + "oauth-signup", {
        credential: token,
        type: type
    })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const loginOAuth = (token, type) => {
    return axios
        .post(API_URL + "oauth-signin", {
            credential: token,
            type: type
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const createGoogleAuthLink =  () => {
    return axios
        .post(API_URL + "create-google-auth-link", {
        })
        .then((response) => {
            window.location.href = response.data.url;
            // if (response.data.accessToken) {
            //     localStorage.setItem("user", JSON.stringify(response.data));
            // }

            // return response.data;
        });
};

const getGoogleRefreshToken = (token) => {
    return axios
        .get(API_URL + "get-valid-token", {
            refreshToken: token
        })
        .then((response) => {
            // if (response.data.accessToken) {
            //     localStorage.setItem("user", JSON.stringify(response.data));
            // }

            // return response.data;
        });
};

const createMicrosoftAuthLink =  () => {
    return axios
        .post(API_URL + "create-microsoft-auth-link", {
        })
        .then((response) => {
            window.location.href = response.data;
            // if (response.data.accessToken) {
            //     localStorage.setItem("user", JSON.stringify(response.data));
            // }

            // return response.data;
        });
};

const getMicrosoftRefreshToken = (token) => {
    return axios
        .get(API_URL + "get-valid-microsoft-token", {
            refreshToken: token
        })
        .then((response) => {
            // if (response.data.accessToken) {
            //     localStorage.setItem("user", JSON.stringify(response.data));
            // }

            // return response.data;
        });
};


const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
    registerOAuth,
    loginOAuth,
    createGoogleAuthLink,
    getGoogleRefreshToken,
    createMicrosoftAuthLink,
    getMicrosoftRefreshToken
};

export default authService;
