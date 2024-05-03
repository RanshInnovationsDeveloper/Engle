
import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis";
import { updateSubscriptionData } from "./subscriptionService";

const handlePayment = async (paymentData) => {
    try {

        let { amount,userId,userEmail,userName,noOfDaysInSubscription,dispatch} = paymentData;
        const response = await apiConnector("POST", paymentEndpoints.CHECKOUT_API, { amount });
        const order = response?.data?.order;

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Engle Subscription Service",
            description: "Transaction for Subscription Service",
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: order.id,
            
            // after successfully payment, this handler will be called.
            handler: async function (response) {
                const data = {
                    razorpay_order_id: order.id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    userId:userId
                }

                const verifyResponse = await apiConnector("POST", paymentEndpoints.PAYMENT_VERIFICATION_API, data);
                if (verifyResponse?.data?.success) {
                    // update user-subscription data in backend.
                    await updateSubscriptionData(userEmail,noOfDaysInSubscription,userId,dispatch);
                    toast.success("Subscription create successfully");
                } else {
                    toast.error("Payment Failed!");
                }
                return;

            },
            prefill: {
                name: userName,
                email: userEmail,
            },
            notes: {
                "address": "Ransh Innovation Corporate Office"
            },
            theme: {
                "color": "#4A5995"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        return;

    } catch (error) {
        console.log("There is some error to handle the payment -", error);
        toast.error("Payment failed!");
        return ;
    }
}

export { handlePayment };