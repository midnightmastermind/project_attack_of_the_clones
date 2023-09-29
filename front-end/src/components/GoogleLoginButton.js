
import React from "react";
import styled from "styled-components";
import { GoogleLogin } from '@react-oauth/google';
import AuthService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect, useCallback}  from 'react';

const GoogleLoginButton = (props) => {
    const [code, setCode] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        handleTokenFromQueryParams();
      }, []);

    const handleUser = (accessToken) => {
        props.callBackFunction(accessToken, 'google')
    }
    
    const handleTokenFromQueryParams = () => {
        const query = new URLSearchParams(window.location.search);
        const accessToken = query.get("googleAccessToken");
        const refreshToken = query.get("googleRefreshToken");      

        const expirationDate = newExpirationDate();
        console.log("App.js 30 | expiration Date", expirationDate);
        if (accessToken && refreshToken) {
          storeTokenData(accessToken, refreshToken, expirationDate);
        //   setIsLoggedIn(true);
        }

        if (accessToken) {
            handleUser(accessToken)
        }
      };
    
      const newExpirationDate = () => {
        var expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        return expiration;
      };
    
      const storeTokenData = async (token, refreshToken, expirationDate) => {
        sessionStorage.setItem("googleAccessToken", token);
        sessionStorage.setItem("googleRefreshToken", refreshToken);
        sessionStorage.setItem("expirationDate", expirationDate);
      };

    return (
        <Wrapper>
             <button onClick={AuthService.createGoogleAuthLink}>Login</button>
            {/* 
      {!code && <div>No code</div>} */}
            {/* {code && (
                <div>
                    <div>Authorization Code: {code}</div>
                </div>
            )}
            {errorMessage && <div>{errorMessage}</div>} */}
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

export default GoogleLoginButton;