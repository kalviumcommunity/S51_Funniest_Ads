const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());



// Secret key for JWT token signing (should be securely stored)
const JWT_SECRET = 'aditya';

// Dummy user database (replace this with a real one)
const users = [
    { id: 1, username: 'jack', password: '12345' },
    { id: 2, username: 'jill', password: '98765' }
];

// Endpoint for user authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy authentication logic
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true });

    // Return success response with token
    res.json({ message: 'Login successful', token });
});

// Example protected endpoint
app.get('/protected', (req, res) => {
    // Extract token from cookie
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user based on the decoded user ID
        const user = users.find(u => u.id === decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // If token is valid, send response with username and user ID
        res.json({ message: 'Access granted to protected resource', username: user.username, userId: decoded.userId });
    } catch (error) {
        // If token is invalid, return unauthorized
        return res.status(401).json({ message: 'Unauthorized' });
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
