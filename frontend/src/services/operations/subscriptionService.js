import { apiConnector } from "../apiConnector";
import { subscriptionEndpoints } from "../apis";
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
            return { token: response?.data?.token };
        }
        else {
            // if user is first time login and token is not created
            try {
                // create the token first time in database
                const response = await apiConnector("POST", subscriptionEndpoints.CREATE_SUBSCRIPTION_API, data);
                if (response?.data?.token) {
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




const updateSubscriptionData = async (userEmail,noOfDaysInPlan,userId,dispatch) => {

    try{
        const data = {
            email: userEmail,
            userId: userId,
            noOfDaysInPlan: noOfDaysInPlan,
            planStartingDate: new Date().toISOString(),
            planEndingDate: new Date(new Date().getTime() + noOfDaysInPlan * 24 * 60 * 60 * 1000).toISOString()
        }
        const response = await apiConnector("POST", subscriptionEndpoints.UPDATE_SUBSCRIPTION_API, data);

        if(response?.data?.token)
            {
                dispatch(setSubscriptionToken(response?.data?.token));
                localStorage.setItem("subscriptionToken", response?.data?.token);
            }
        return ;

    }catch(error){
        console.log("There is some error to update the subscription data -", error);
        return ;
    }
}




const validateSubscriptionToken = async (token, dispatch, email, userId) => {
    try {

        const response = await apiConnector("POST", subscriptionEndpoints.VALIDATE_SUBSCRIPTION_TOKEN_API, token );
        if (response?.data?.isexpire == false) {
            // do nothing.
            return ;
        }
        else {
            // if token is expire then generate new token
            const data = {
                email: email,
                userId: userId
            }
            const response = await apiConnector("POST", subscriptionEndpoints.GET_SUBSCRIPTION_TOKEN_API, data);
            if (response?.data?.token) {
                dispatch(setSubscriptionToken(response?.data?.token));
                localStorage.setItem("subscriptionToken", response?.data?.token);
            }
            else {
                console.log("There is some error to generate the subscription token - no token in response");
            }
            return ;
        }


    } catch (error) {
        console.log("There is some error to validate the subscription token -", error);
        return ;
    }
}




const getSubscriptionData = async (token) => {
    try {
        const response = await apiConnector("POST", subscriptionEndpoints.GET_SUBSCRIPTION_DATA_API, token);
        return response?.data?.data;
              
    } catch (error) {
        console.log("There is some error to get the subscription data -", error);
        return null;
    }

}


export { getSubscriptionDataToken, validateSubscriptionToken,getSubscriptionData,updateSubscriptionData };