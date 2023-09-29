import clientIds from "../common/clientIds.js";
import React from "react";
import styled from "styled-components";
import MicrosoftLogin from "react-microsoft-login";
import AuthService from "../services/auth.service";
import {useState, useEffect, useCallback}  from 'react';

const MicrosoftLoginButton = (props) => {
    const [code, setCode] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    //   const responseMicrosoft = response => {
    //     props.callback({
    //         type: "microsoft",
    //         payload: response
    //     })
    // }

    useEffect(() => {
        handleTokenFromQueryParams();
      }, []);

    const handleUser = (accessToken) => {
        props.callBackFunction(accessToken, 'microsoft')
    }
    
    const handleTokenFromQueryParams = () => {
        const query = new URLSearchParams(window.location.search);
        const accessToken = query.get("microsoftAccessToken");
        
        if (accessToken) {
            storeTokenData(accessToken);
            handleUser(accessToken)
        }
      };
 
      const storeTokenData = async (token, refreshToken, expirationDate) => {
        sessionStorage.setItem("microsoftAccessToken", token);
      };
    return (
        <Wrapper>
            {/* <ReactLoginMS
            clientId={clientIds.microsoft.clientId}
            redirectUri={`${window.location.origin}/login`}
            cssClass="ms-login"
            btnContent="LOGIN WITH MICROSOFT"
            responseType="token"
            handleLogin={data => responseMicrosoft(data)}
        /> */}
            {/* <MicrosoftLogin 
                clientId={clientIds.microsoft.clientId} 
                authCallback={authHandler} 
                redirectUri={`${window.location.origin}/${props.authType}`}
                /> */}
            <button onClick={AuthService.createMicrosoftAuthLink}>Login</button>
            {/* {!code && <div>No code</div>} */}
            {code && (
                <div>
                    <div>Authorization Code: {code}</div>
                </div>
            )}
            {errorMessage && <div>{errorMessage}</div>}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Link = styled.a`
  font-size: 20px;
  font-weight: bold;
`;

export default MicrosoftLoginButton;