const { db ,admin} = require("../config/firebase");

// this Controller is run when user signUp means we create a new Referral code for that user and store it in the database
const createReferral = async (req, res) => {
    try {
        let { referralCode, userId,value} = req.body;
        value=Number(value);
        if (!referralCode) {
            return res.status(403).json({ success: false, message: "Referral code is required" });
        }

        const jsonData = {
            value: value,         // it store the value of that code i.e discount in percentage (30,10,20 ...)      
            userId: userId,   // it store the userId of the user who has this code
            count: 0          // it store the count of the user who has used this code during signUp
        }
        const docRef = db.collection("referrals").doc(referralCode);
        await docRef.set( jsonData );


        const jsondata2 = {
            referralCode: referralCode,
            time: Date.now(),
            value: value          // it store the value of that code i.e discount in percentage (30,10,20 ...)
        }
        const docRef2 = db.collection("subscription").doc(userId);
        const subCollectionRef2 = docRef2.collection("referralCodes");
        const subDocRef2 = subCollectionRef2.doc(referralCode);
        await subDocRef2.set( jsondata2 );

        const docRef3=db.collection("subscription").doc(userId);
        const subCollectionRef3=docRef3.collection("wallet")
        const subDocRef3=subCollectionRef3.doc(userId);
        await subDocRef3.set({
            [value]:0
        });

        return res.status(200).json({ success: true, message: "Referral code created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "There is some error to create the referral code ", error: error.message });
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
            return res.status(200).json({ success: true, message: "Referral code is not valid", isValid: false , value:0,count:0});
        }
        else {
            return res.status(200).json({ success: true, message: "Referral code is valid", isValid: true,value:doc.data().value ,count:doc.data().count});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "There is some error to verify the referral code ", error: error.message });
    }
}



// This updated value is used by the user who have this referral code.
//this controller is used when we change the count of referral code means how many times this referralCode has been used
const updateReferralData = async (req, res) => {
    try {
        let { referralCode, countValue } = req.body;
        countValue=Number(countValue);
        if (!referralCode || !countValue) {
            return res.status(403).json({ success: false, message: "Referral code and countValue is required" });
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




// This Controller is used when user signup with a referral code provide by other person , then as a bonous we add some amount in the wallet of the user who use this referral code.
const updateWalletAmount=async(req,res)=>{
    try{
        
        // here valueOfReferralCode means 20% discount or 30% discount or 10% discount ...
        let {userId,valueOfReferralCode,amount}=req.body;
        amount=Number(amount);
        valueOfReferralCode=Number(valueOfReferralCode);

        // here if amount is positive then it means we add this amount in the wallet of the user ,if amount is negative then we deduct this amount from the wallet of the user
        if(!userId || !valueOfReferralCode || !amount){
            return res.status(403).json({ success: false, message: "userId, valueOfReferralCode and amount is required" });
        }

        const docRef=db.collection("subscription").doc(userId);
        const subCollectionRef=docRef.collection("wallet");
        const subDocRef=subCollectionRef.doc(userId);
        await subDocRef.set({
            [valueOfReferralCode]:admin.firestore.FieldValue.increment(amount)
        },{merge:true});

       return res.status(200).json({ success: true, message: "Wallet amount updated successfully" });

    }catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "There is some error to update the wallet amount ", error: error.message });
    }
}



module.exports = { createReferral, updateReferralData, verifyReferralCode, updateWalletAmount};