const BASE_URL=process.env.BACKEND_URL

export const authEndpoints={
    
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    FORGOTPASSWORD_API: BASE_URL + "/auth/reset-password",
};