import { apiConnector } from "../apiConnector";
import { subscriptionEndpoints } from "../apis";
// import { isExpired, decodeToken } from "react-jwt";
import { setSubscriptionToken } from "../../slices/subscriptionSlice";




const getSubscriptionDataToken = async (email, userId) => {
    try {
        const data = {
            email: email,
            userId: userId
        }
        const response = await apiConnector("POST", subscriptionEndpoints.GET_SUBSCRIPTION_TOKEN_API, data);

        // if user is already login and token is already created
        if (response?.data?.token) {
            console.log(response?.data?.token);
            return { token: response?.data?.token };
        }
        else {
            // if user is first time login and token is not created
            try {

                // create the token first time in database
                const response = await apiConnector("POST", subscriptionEndpoints.CREATE_SUBSCRIPTION_API, data);
                if (response?.data?.token) {
                    console.log("user is first time login so token is created");
                    return { token: response?.data?.token };
                }
                else {
                    console.log("There is some error to create the subscription token - no token in response");
                    return { token: null };
                }
            } catch (err) {
                console.log("There is some error to create the subscription token -", err);
                return { token: null };
            }
        }
    } catch (error) {
        console.log("There is some error to get the subscription token -", error);
        return { token: null };
    }
}



const validateSubscriptionToken = async (token, dispatch, userId, email) => {

    // try {
    //     const data = {
    //         token: token,
    //         userId: userId,
    //         email: email
    //     }
    //     const response = await apiConnector("POST", subscriptionEndpoints.VALIDATE_SUBSCRIPTION_TOKEN_API, data);
    //     if (response?.data?.status === "success") {
    //         console.log("Subscription token is valid");
    //         dispatch(setSubscriptionToken({ token: token }));
    //     }
    //     else {
    //         console.log("Subscription token is not valid");
    //         return;
    //     }
  
    // } catch (error) {
    //     console.log("There is some error to validate the subscription token -", error);
    //     return;
    // }

}

export { getSubscriptionDataToken,validateSubscriptionToken };