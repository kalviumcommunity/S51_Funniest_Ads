const express = require('express')
<<<<<<< HEAD
const mongoose = require("mongoose")
const connectToDB  = require("./dbConnect.js")
const dotenv = require("dotenv")
const app = express()
const port = 3000

connectToDB()

=======
const app = express()
const port = 3000

>>>>>>> 4dd43faa6ed01eb4bc1622b7860c04eed071ec6f
app.get('/ping', (req, res) => {
    res.send("Hello World")
})
app.get('', (req, res) =>{
  res.send("You are looking into a blank page")
})

app.use((req, res) => {
  res.status(404).send("ERROR")
})

<<<<<<< HEAD
mongoose.connection.once("open", () => {
  console.log("mongoose connected")
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})

=======
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
>>>>>>> 4dd43faa6ed01eb4bc1622b7860c04eed071ec6f
