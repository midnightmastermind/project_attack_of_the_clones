import React, { useState } from "react";

import "../css/ExtraLoginOptions.css"
// import InstagramLogin from 'react-instagram-login';
// import GithubLogin from "react-github-login";
// import FacebookLogin from "react-facebook-login";
// import PaypalBtn from 'react-paypal-checkout';
// import TwitterLogin from "react-twitter-login";
import LinkedInLoginButton from "./LinkedInLoginButton"
import GoogleLoginButton from "./GoogleLoginButton"
import MicrosoftLoginButton from "./MicrosoftLoginButton"
import clientIds from "../common/clientIds.js";


const ExtraLoginOptions = (props) => {
    // const payonCancel = (data) => {
    //     // User pressed "cancel" or close Paypal's popup!
    //     alert("Do nothing")
    //     console.log('The payment was cancelled!', data);
    // }

    // const onError = (err) => {
    //     // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    //     alert("Show a message to the user")
    //     console.log("Error!", err);
    // }

    // let env = 'sandbox'; // you can set here to 'production' for production
    // let currency = 'MXN'; // or you can set this value from your props or state
    // let total = 100;  // same as above, this is the total amount (based on currency) to be
    // let locale = 'en_US';
    // // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
    // let style = {
    //     'label': 'pay',
    //     'tagline': false,
    //     'size': 'medium',
    //     'shape': 'pill',
    //     'color': 'black'
    // };

    // const client = {
    //     sandbox: 'ARgh1CBhUehRTJbJbdeV3pt0F7bkoVs-4KijtTAy_Y17H-ya6NkWiONcrFzrIzAuRAJ9RE83Ui06FQVk',
    //     production: 'ARgh1CBhUehRTJbJbdeV3pt0F7bkoVs-4KijtTAy_Y17H-ya6NkWiONcrFzrIzAuRAJ9RE83Ui06FQVk',
    // }





    // const paypalOptions = {
    //     clientId:
    //         "AfFXgFyGbhcKFY3frpc9DAzvaMURvGDnjHUyVmezEKa9g0n-A37Zc4AGtUw9OKfKZfPLVmdHTpuEGTn1",
    //     intent: "capture"
    // };

    // const responseFacebook = response => {
    //     console.log(response);

    // }

    // const onSuccessGithub = response => {
    //     console.log(response.code);
    // };

    // const authHandlerTwitter = (err, data) => {
    //     console.log(err, data);
    // }

    // const payonSuccess = (payment) => {
    //     // Congratulation, it came here means everything's fine!
    //     alert('Post to backend to save the info in database')
    //     console.log("The payment was succeeded!", payment);
    // }


    // const responseInstagram = response => {
    //     console.log(response)
    // }
    // const tweonSuccess = (response) => {
    //     console.log(response)

    //     const token = response.headers.get('x-auth-token');
    //     response.json().then(user => {
    //         console.log(user)
    //         if (token) {
    //             this.setState({ isAuthenticated: true, user: user, token: token });
    //         }
    //     });
    // };

    // const tweonFailed = (error) => {
    //     alert(error);
    // };

    // const CONSUMER_KEY = "PyHxgJuyORZqhDiuKAne8LcxT"
    // const CONSUMER_SECRET = "RBqOgWJfflgk2GLGmKtHFnHituqvf3vROPfAqzOPpfKficIrI9"
    // const CALLBACK_URL = "https://alexandrtovmach.github.io/react-twitter-login/"
    const types = props.typeOfLogin;


    const showGoogle = () => {
        return <GoogleLoginButton callBackFunction={ props.callBackFunction } />
    }

    // const showFB = () => {
    //     return <FacebookLogin
    //         btnContent="LOGIN With Facebook"
    //         appId="185202659227880"
    //         fields="name,email,picture"
    //         onSuccess={responseFacebook}
    //         onFailure={responseFacebook}
    //     />
    // }

    // const showGIT = () => {
    //     return <GithubLogin
    //         clientId="15f9cc86c96d14536717"
    //         onSucess={onSuccessGithub}
    //         buttonText="LOGIN WITH GITHUB"
    //         className="GithubLogin"


    //     />
    // }

    const showMS = () => {
        return <MicrosoftLoginButton callBackFunction={ props.callBackFunction } authType={props.authType}/>
    }

    const showLinkedIn = () => {
        return <LinkedInLoginButton callBackFunction={ props.callBackFunction } />
    }


    // const showTwe = () => {
    //     return <div id="TwitterLogin_main"> <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
    //         onFailure={tweonFailed} onSuccess={tweonSuccess}
    //         buttonTheme='dark'
    //         className="TwitterLogin"
    //         consumerKey={CONSUMER_KEY}
    //         consumerSecret={CONSUMER_SECRET}
    //         callbackUrl={CALLBACK_URL}
    //         requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" />
    //     </div>
    // }

    // const showPaypal = () => {
    //     return <PaypalBtn
    //         env={env}
    //         client={client}
    //         currency={currency}
    //         total={total}
    //         locale={locale}
    //         style={style}
    //         onError={onError}
    //         onSuccess={payonSuccess}
    //         onCancel={payonCancel} />
    // }

    // const showInstagram = () => {
    //     return <InstagramLogin
    //         clientId="5fd2f11482844c5eba963747a5f34556"
    //         buttonText=" Login with Instagram "
    //         cssClass="InstagramLogin"
    //         onSuccess={responseInstagram}
    //         onFailure={responseInstagram}
    //     />
    // }


    return (
        <div className="login-options">
                {
                    types.includes("google") ? showGoogle() : null
                }
                {
                    /* {
                                types.includes("FACEBOOK") ? showFB() : null
                            }
                            {
                                types.includes("GITHUB") ? showGIT() : null
                            } */
                }
                {
                    types.includes("microsoft") ? showMS() : null
                }
                {
                    /* {
                                types.includes("Twitter") ? showTwe() : null
                            } */
                }
                {
                    types.includes("linkedin") ? showLinkedIn() : null
                }
                {
                    /* {
                                types.includes("Instagram") ? showInstagram() : null
                            } */
                }
        </div>
    );
}

export default ExtraLoginOptions;