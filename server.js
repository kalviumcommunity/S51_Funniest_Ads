const express = require('express')
const app = express()
const port = 3000

app.get('/ping', (req, res) => {
    res.send("Hello World!")
})
app.get('', (req, res) =>{
  res.send("You are looking into a blank page")
})

app.use((req, res) => {
  res.status(404).send("ERROR")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})