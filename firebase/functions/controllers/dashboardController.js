const {db}=require("../config/firebase")

const addStoryPreference=async(req,res)=>{

    const {userId,filters}=req.body;
    const docRef=db.collection("dashboard").doc(userId)
    const subCollectionRef=docRef.collection("storyPreference")
    const subDocRef=subCollectionRef.doc(userId)
    const docSnap=await docRef.get()

    if (!docSnap.exists){
        await docRef.set({})
    }

    await subDocRef.set({ filters }, { merge: true });

    res.status(200).json({ status: "success", message: "Story preference updated successfully" });

}


const fetchStoryPreference=async(req,res)=>{
    try {
        const {userId}=req.query;
    if (!userId){
        return res.status(400).json({status:"error",message:"userId is required"})
    }

    const docRef=db.collection("dashboard").doc(userId)
    const subCollectionRef=docRef.collection("storyPreference")
    const subDocRef=subCollectionRef.doc(userId)

    const docSnap=await subDocRef.get()
    if (!docSnap.exists){
        return res.status(200).json({})
    }
    const data=docSnap.data()
    res.status(200).json(data)
    } catch (error) {
        res.status(500).json({status:"error",message:error.message})
    }
}

module.exports={addStoryPreference,fetchStoryPreference}