const { db } = require("../config/firebase");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;

const createSubscription = async (req, res) => {
    try {
        const { email, userId } = req.body;
        if (!email || !userId) {
            res.status(403).json({ status: "error", message: "please Provide both email and UserId!",token:null});
            return;
        }

        const jsonData = {
            email: email,
            isSubscribed: false,
            noOfDaysInPlan: null,
            planEndingDate: null,
            planStartingDate: null,
            userId: userId,
            timeStamp: serverTimestamp()
        }

        const docRef = db.collection("subscription").doc(userId);
        const subCollectionRef = docRef.collection("userData");
        const subDocRef = subCollectionRef.doc(userId);
        await subDocRef.set({
            jsonData
        });

        const token = jwt.sign(jsonData, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ status: "success", message: "subscription create successfully", token: token })
        return;

    } catch (error) {
        res.status(500).json({ status: "error", message: `some error to create Subscription => ${error.message}`,token:null });
        return;
    }
};





const updateSubscription = async (req, res) => {
    try {
        const { email, userId,isSubscribed, noOfDaysInPlan,planStartingDate,planEndingDate} = req.body;
        if (!email || !userId || !isSubscribed || !noOfDaysInPlan || !planStartingDate || !planEndingDate) {
            res.status(403).json({ status: "error", message: "please provide all field!",token:null });
            return;
        }

        const jsonData = {
            email: email,
            isSubscribed: isSubscribed,
            noOfDaysInPlan: noOfDaysInPlan,
            planEndingDate: planEndingDate,
            planStartingDate: planStartingDate,
            userId: userId,
            timeStamp: serverTimestamp()
        }

        const docRef = db.collection("subscription").doc(userId);
        const subCollectionRef = docRef.collection("userData");
        const subDocRef = subCollectionRef.doc(userId);
        await subDocRef.update({
            jsonData
        });

        const token = jwt.sign(jsonData, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ status: "success", message: "subscription update successfully", token: token })
        return;

    } catch (error) {
        res.status(500).json({ status: "error", message: `some error to update Subscription => ${error.message}`,token:null });
        return;
    }
};




const generateToken = async (req, res) => {
    try{
        const { email, userId } = req.body;
        if (!email || !userId) {
            res.status(403).json({ status: "error", message: "please Provide both email and UserId!",token:null});
            return;
        }

        const docRef = db.collection("subscription").doc(userId);
        const subCollectionRef = docRef.collection("userData");
        const subDocRef = subCollectionRef.doc(userId);
        const doc = await subDocRef.get();

        // means our user is first time login and there is no data in subscription field.
        if (!doc.exists) {
            res.status(200).json({ status: "success", message: "No such user Found!",token:null });
            return;
        } else {
            const data = doc.data();
            const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "12h" });
            res.status(200).json({ status: "success", message: "token generated successfully", token: token })
            return;
        }

    }catch(error){
        res.status(500).json({ status: "error", message: `some error to generate token => ${error.message}`,token:null });
        return;
    }
 };


module.exports = {
    createSubscription, updateSubscription, generateToken
};