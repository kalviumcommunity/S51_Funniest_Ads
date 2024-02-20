const mongoose = require("mongoose")

const connectToDB = async () => {
    try {
      //  Your code goes here
      await mongoose.connect("mongodb+srv://adityakannur:Aditya252004@cluster0.5zhqbdd.mongodb.net/FunniestAds_Database?retryWrites=true&w=majority", {
        // useUnifiedTopology : true,
        // useNewUrlParser : true
      })
  
      console.log('📦 connected to mongoDB');
    } catch (err) {
      console.error('❌ error connecting to mongoDB:', err.message);
    }
  };
  
//   const disconnectFromDB = async () => {
//     try {
//       //  Your code goes here
//       await mongoose.connection.close()
//       console.log('📦 disconnected from mongoDB');
//     } catch (err) {
//       console.error('❌ error disconnecting from mongoDB:', err.message);
//     }
//   };

  module.exports = connectToDB