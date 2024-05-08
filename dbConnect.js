const mongoose = require("mongoose")

const connectToDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://adityakannur:Aditya252004@cluster0.5zhqbdd.mongodb.net/FunniestAds_Database?retryWrites=true&w=majority", {
      })
  
      console.log('📦 connected to mongoDB');
    } catch (err) {
      console.error('❌ error connecting to mongoDB:', err.message);
    }
  };
  

  module.exports = connectToDB