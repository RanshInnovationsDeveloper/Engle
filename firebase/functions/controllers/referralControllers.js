const { db } = require("../config/firebase");


// this Controller is run when user signUp means we create a new Referral code for that user and store it in the database
const createReferral = async (req, res) => {
    try {
        const { referralCode, userId } = req.body;
        if (!referralCode) {
            return res.status(403).json({ success: false, message: "Referral code is required" });
        }

        const jsonData = {
            value: 20,         // it store the value of that code i.e discount in percentage (30,10,20 ...)      
            userId: userId,   // it store the userId of the user who has this code
            count: 0          // it store the count of the user who has used this code during signUp
        }
        const docRef = db.collection("referrals").doc(referralCode);
        await docRef.set( jsonData );


        const jsondata2 = {
            referralCodevalue: referralCode,
            time: Date.now(),
            value: 20          // it store the value of that code i.e discount in percentage (30,10,20 ...)
        }
        const docRef2 = db.collection("subscription").doc(userId);
        const subCollectionRef2 = docRef2.collection("referralCodes");
        const subDocRef2 = subCollectionRef2.doc(referralCode);
        await subDocRef2.set( jsondata2 );

        return res.status(200).json({ success: true, message: "Referral code created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "There is some error to create the referral code ", error: error.message });
    }
}




//this controller is used when we change the count of referral code means how many times this code has been used
const updateReferralData = async (req, res) => {
    try {
        let { referralCode, countValue } = req.body;
        countValue=Number(countValue);
        if (!referralCode || !userId) {
            return res.status(403).json({ success: false, message: "Referral code and userId is required" });
        }

        const docRef = db.collection("referrals").doc(referralCode);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(200).json({ success: false, message: "Referral code is not valid" });
        }

        let data = doc.data();
        let count;
        if (countValue != 0)
            count = Number(data?.count) + countValue;
        else
            count = 0;

        const jsonData = {
            value: data?.value,
            userId: data?.userId,
            count: count
        }
        await docRef.set( jsonData );

        return res.status(200).json({ success: true, message: "Referral code updated successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "There is some error to update the referral code ", error: error.message });
    }
}



const verifyReferralCode = async (req, res) => {
    try {
        const { referralCode } = req.body;
        if (!referralCode) {
            return res.status(403).json({ success: false, message: "Referral code is required" });
        }

        const docRef = db.collection("referrals").doc(referralCode);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(200).json({ success: true, message: "Referral code is not valid", isvalid: false , value:0 });
        }
        else {
            return res.status(200).json({ success: true, message: "Referral code is valid", isvalid: true,value:doc.data().value });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "There is some error to verify the referral code ", error: error.message });
    }
}



// const updateWalletAmount = async (userId, amount) => {
//     try {
//         const docRef = db.collection("subscription").doc(userId);
//         const doc = await docRef.get();
//         if (!doc.exists) {
//             return false;
//         }

//         let data = doc.data();
//         let walletAmount = Number(data?.walletAmount) + amount;

//         const jsonData = {
//             walletAmount: walletAmount
//         }
//         await docRef.set( jsonData );

//         return true;

//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

module.exports = { createReferral, updateReferralData, verifyReferralCode};