
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./models/user');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://khaoulakaddachi:sarraetadem@cluster0.a6izxyv.mongodb.net/";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Route to return all users
app.get('/users', async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// Route to add a new user to the database
app.post('/users', async (req, res) => {
  try {
    const newUser = new user(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding a user' });
  }
});

// Route to edit a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating a user' });
  }
});

// Route to remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await user.findByIdAndRemove(req.params.id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing a user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
