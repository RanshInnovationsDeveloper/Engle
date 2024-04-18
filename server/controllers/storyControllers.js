//Various conrollers to handle story functionality

//Imports
const story=require("../resources/sampleStory.json")

//Fetch all the stories
const getAllStrories = async (req, res) => {
    try {
        res.status(200).send(story);
    } catch (error) {
        console.log("Error in getAllStrories", error)
        res.status(500).json({status:"error",message:error.message})
    }
}

//Get a particular story based on id 
const getStoryById = async (req, res) => {
try {
    const {id}=req.params;
    if (story[id] != undefined) {
    res.status(200).send(story[id]);
}
else {
    res.status(404).json({status:"error",message:"Story not found"});
}

} catch (error) {
    console.log("Error in getStoryById", error)
    res.status(500).json({status:"error",message:error.message})
}
}
//Exporting the controllers
module.exports = {getAllStrories, getStoryById}