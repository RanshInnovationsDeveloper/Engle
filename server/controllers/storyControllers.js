const story=require("../resources/sampleStory.json")

//Fetch all the stories
const getAllStrories = async (req, res) => {
    try {
        res.status(200).send(story);
    } catch (error) {
        console.log("Error in getAllStrories", error)
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
    res.status(404).send("Story not found");
}

} catch (error) {
    console.log("Error in getStoryById", error)
}
}

module.exports = {getAllStrories, getStoryById}