import { apiConnector } from "../apiConnector";
import { referralEndpoints } from "../apis";
import { toast } from "react-toastify";


function generateReferralCode(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let referralCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        referralCode += characters[randomIndex];
    }
    return referralCode;
}


const createReferral = async (userId, value) => {
    try {

        let referralCode = generateReferralCode(8);
        console.log("Referral code is -> ", referralCode);

        const data = {
            userId: userId,
            referralCode: referralCode,
            value: value
        }

        const response = await apiConnector("POST", referralEndpoints.CREATE_REFERRAL_API, data);
        if (response.data.success == false)
            toast.warning("Referral code not generate");

        return;

    } catch (error) {
        console.log("There is some server error to createReferral -", error);
        return;
    }
}



const verifyReferralCode = async (referralCode) => {
    try {

        const data = {
            referralCode: referralCode
        }
        const response = await apiConnector("POST", referralEndpoints.VERIFY_REFERRAL_API, data);
        if (response?.data?.isValid == false)
            toast.error("Referral Code is invalid!");

        return {value:response?.data?.value,count:response?.data?.count,isValid:response?.data?.isValid};
    } catch (error) {
        console.log("There is some server error to verify the referral code -", error);
        return {value:0,count:0,isValid:false};
    }
}



const updateReferralData = async (referralCode, countValue) => {
    try {
        const data = {
            referralCode: referralCode,
            countValue: countValue
        }
        await apiConnector("POST", referralEndpoints.UPDATE_REFERRAL_API, data);
        return;

    } catch (error) {
        console.log("There is some server error to update the referral data -", error);
        return;
    }
}



const updateWalletAmount = async (userId, valueOfReferralCode, amount) => {
    try {
        const data = {
            userId: userId,
            valueOfReferralCode: valueOfReferralCode,          // means 10% or 20% or 30% discount...
            amount: amount
        }
        await apiConnector("POST", referralEndpoints.UPDATE_WALLET_AMOUNT_API, data);
        return;

    } catch (error) {
        console.log("There is some server error to update the wallet amount -", error);
        return;
    }
}


export { createReferral, verifyReferralCode, updateReferralData, updateWalletAmount };