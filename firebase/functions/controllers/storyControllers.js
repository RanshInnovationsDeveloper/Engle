const {db}=require("../config/firebase")
const axios=require("axios")
require("dotenv").config()
//Various conrollers to handle story functionality

//Imports
const story=require("../resources/sampleStory.json")

//Fetch all the stories
const getAllStories = async (req, res) => {
    try {
        const {userId}=req.query
        const response=await axios.get(String(process.env.BASE_URL)+`/story/getStoryCount`)
        const response_2=await axios.get(String(process.env.BASE_URL)+`/story/getScrollPercentage?userId=${req.query.userId}`)  
        const storyCount=response?.data      
        const scrollPercentage=response_2?.data
        const storyArray=[]
        for (let i = 0; i < story.length; i++) {
            const storyObj={
                id:story[i]?.id,
                title:story[i]?.title,
                isFree:story[i]?.isFree,
                genre:story[i]?.genre,
                count:storyCount[String(story[i]?.id)] || 0,
                scrollPercentage:scrollPercentage[Number(story[i]?.id)] || 0
            }
            storyArray.push(storyObj)
        }
        res.status(200).send(storyArray);
    } catch (error) {
        console.log("Error in getAllStories", error)
        res.status(500).json({status:"error",message:error.message})
    }
}

//Get a particular story based on id 
const getStoryById = async (req, res) => {
try {
    const {id}=req.params;
    const storyObj=story.find(story=>story?.id==id);
    res.status(200).send(storyObj);
}
catch (error) {
    console.log("Error in getStoryById", error)
    res.status(500).json({status:"error",message:error.message})
}
}

//fetch the count of stories
const getStoryCount=async(req,res)=>{
    try {
        const docRef=db.collection("stories-count").doc("count");
        const docSnap=await docRef.get();
        if (docSnap.exists){
            res.status(200).send(docSnap.data());
        }
        else{
            res.status(200).send({})
        }
    } catch (error) {
        res.status(500).json({status:"error",message:error.message})
    }
}

//update the count of stories
const updateStoryCount = async (req, res) => {
    try {
      const { storyId } = req.query;
      const docRef = db.collection("stories-count").doc("count");
  
      const docSnap = await docRef.get();
  
      if (!docSnap.exists) {
        await docRef.set({ [storyId]: 1 });
      } else {
        const data = docSnap.data();
        const currentCount = data[storyId] || 0;
        await docRef.set({ [storyId]: currentCount + 1 }, { merge: true });
      }
  
      res.status(200).json({ status: "success", message: "Story count updated successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

//This is to getTheScrollPercentage
const getScrollPercentage=async(req,res)=>{
    try {
        const {userId}=req.query
        const docRef=db.collection("scroll-percentage").doc(userId);
        const docSnap=await docRef.get();
        if (docSnap.exists){
            res.status(200).send(docSnap.data());
        }
        else{
            res.status(200).send({})
        }
    } catch (error) {
        res.status(500).json({status:"error",message:error.message})
    }
}

//This is to update the scroll percentage
const updateScrollPercentage=async(req,res)=>{
    try {
        const {userId,storyId,percentage}=req.body
        const docRef=db.collection("scroll-percentage").doc(userId);
        const docSnap=await docRef.get();
        if (!docSnap.exists){
            await docRef.set({[storyId]:percentage})
        }
        else{
            const data=docSnap.data();
            await docRef.set({[storyId]:percentage},{merge:true})
        }

    } catch (error) {
        res.status(500).json({status:"error",message:error.message})
    }
}
//Exporting the controllers
module.exports = {getAllStories, getStoryById,getStoryCount,updateStoryCount,getScrollPercentage,updateScrollPercentage}