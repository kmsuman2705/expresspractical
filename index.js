const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User schema define karein
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// User model banayein
const User = mongoose.model('User', UserSchema);

// 'public' directory se static files serve karein
app.use(express.static(path.join(__dirname, 'public')));

// Signup form ko serve karne ka route define karein
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Signup form submit karne ka route handle karein
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    // Naya user banayein
    const newUser = new User({ username, email, password });
    // User ko database mein save karein
    newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Server ko start karein
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

~
~
~
~
~
