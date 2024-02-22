const mongoose = require('mongoose')

const profile = new mongoose.Schema({
    
    id:Number,
    user_name:String,
    email:String,
    Watched_videos:String,
    Likes:String,
    Comments:String,
})

const model = mongoose.model('FunniestAds_Collection', profile)

module.exports = model
