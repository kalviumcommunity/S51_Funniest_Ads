const express = require("express")
const router = express.Router()
const Model = require("../modals/Ads.modal")

router.get('/getData', async(req, res) => {
    try{vs
        const getProfile = await Model.find()
        res.status(200).json(getProfile)
    } catch(error) {
        console.log(error.message)
        res.status(400).send("Internal Server Error")
    }
})

router.post('/postData', async(req, res) => {
    try{
        const {id, user_name, email, Watched_videos, Likes, Comments} = req.body
        console.log(req.body)
        const newProfile = new Model({id, user_name, email, Watched_videos, Likes, Comments})
        await newProfile.save()
        res.status(200).json({"successfully posted": newProfile})
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

router.patch('/patch/:id', async(req, res) => {
    try{
        const {id} = req.params
        const updates = req.body
        const updatedProfile = await Model.findOneAndUpdate(
            {id},
            {$set : updates},
            {new:true}

        )
        if (!updatedProfile) {
            console.log(updatedProfile);
            return res.status(404).json({ message: "Profile not found" });
          }
        res.status(200).json({message:"Successfully updated", updatedProfile})
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

router.delete('/deleteProfile/:id', async(req, res) => {
    try{
        const {id} = req.params
        const deletedProfile = await Model.findOneAndDelete({id})
        if (!deletedProfile) {
            return res.status(404).json({ message: "Profile not found" });
          }
        res.status(200).json({message:"sucessfully deleted", deletedProfile})
    }catch(error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router
