const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const cookie = require("cookie-parser")
const User = require('./modals/UserModal.js');
const joi = require('joi');


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(cookie())

// GET request 
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users from database");
    }
});

// GET request by id
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Error fetching user from the database");
    }
});

const schema = joi.object({
    firstname : joi.string().required(),
    lastname : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().min(8) // Minimum length of 8 characters
    .max(20) // Maximum length of 30 characters
  })

// POST request 
app.post('/createUser', async (req, res) => {
  try {
      // Validate request body against the schema
      const { error, value } = schema.validate(req.body);
      if (error) {
          // If validation fails, return 400 Bad Request with validation error details
          return res.status(400).json({ error: error.details[0].message });
      }

      // If validation succeeds, proceed with creating the user
      const firstname = req.body.firstname;
      if (!firstname) {
          return res.status(400).json({ error: "Firstname is required" });
      }
      
      // Set the 'username' as a cookie
      res.cookie('username', firstname);
      // Create the user
      const newUser = new User(value); // Use validated data
      await newUser.save();
      // Send success response
      return res.status(201).json({ message: "User created and cookie set" });
  } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user in the database");
  }
});


// PUT request by id
app.put('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Error updating user in the database");
    }
});

// DELETE request by id
app.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).send("Error deleting user from the database");
    }
});

app.get('/ping', (req, res) => {
    res.send("Hello World");
});

app.get('/', (req, res) => {
    res.send("You are looking into a blank page");
});

app.use((req, res) => {
    res.status(404).send("ERROR");
});


mongoose.connect("mongodb+srv://adityakannur:Aditya252004@cluster0.5zhqbdd.mongodb.net/FunniestAds_Database?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB Atlas");
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB Atlas:", error);
    });
