// const BASE_URL = process.env.BASE_URL
const BASE_URL="http://localhost:4000";


// AUTH ENDPOINTS
export const authEndpoints = {
   
    SIGNUP_API: BASE_URL+"/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }