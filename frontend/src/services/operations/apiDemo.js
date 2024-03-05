import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis"

const { SIGNUP_API } = authEndpoints;

export const demosignup = async () => {

    const response = await apiConnector("POST", SIGNUP_API, { email: "sdcsdcdvd" });
    console.log("the response is ", response?.data?.user);
}

// you can find this function in contact us page .