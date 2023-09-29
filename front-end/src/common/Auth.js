import AuthService from "../services/auth.service";


export const getGoogleToken = async () => {
    if (tokenExpired()) {
      const refreshtoken = sessionStorage.getItem("refreshToken");
      const token = await AuthService.getGoogleRefreshToken(refreshtoken);
      sessionStorage.setItem("googleAccessToken", token.accessToken);
      sessionStorage.setItem("expirationDate", newExpirationDate());
      return token.accessToken;
    } else {
      console.log("tokens.js 11 | token not expired");
      return sessionStorage.getItem("googleAccessToken");
    }
  };
  
  const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
  };
  
  const tokenExpired = () => {
    const now = Date.now();
  
    const expirationDate = sessionStorage.getItem("expirationDate");
    const expDate = new Date(expirationDate);
  
    if (now > expDate.getTime()) {
      return true; // token expired
    }
  
    return false; // valid token
  };

  export const getMicrosoftToken = async () => {
    // if (tokenExpired()) {
    //   const refreshtoken = sessionStorage.getItem("refreshToken");
    //   const token = await AuthService.getGoogleRefreshToken(refreshtoken);
    //   sessionStorage.setItem("googleAccessToken", token.accessToken);
    //   sessionStorage.setItem("expirationDate", newExpirationDate());
    //   return token.accessToken;
    // } else {
    //   console.log("tokens.js 11 | token not expired");
      return sessionStorage.getItem("microsoftAccessToken");
    //}
  };