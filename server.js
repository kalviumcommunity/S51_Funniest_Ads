const express = require('express')
const mongoose = require("mongoose")
const router = require('./routers/routes.js')

const connectToDB  = require("./dbConnect.js")

const dotenv = require("dotenv")

const app = express()
const port = 3000

connectToDB()

app.use(express.json())
app.use('/', router)

app.get('/ping', (req, res) => {
    res.send("Hello World")
})
app.get('/', (req, res) =>{
  res.send("You are looking into a blank page")
})

app.use((req, res) => {
  res.status(404).send("ERROR")
})

mongoose.connection.once("open", () => {
  console.log("mongoose connected")
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})

