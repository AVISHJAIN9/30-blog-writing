import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; 
import 'dotenv/config';

// 1. Helper function to sign the token and format the response
const formatDatatoSend = (user) => {
    // Ensure this matches the secret name in your .env and verifyJWT.js
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); 
    
    return {
        access_token,
        email: user.email,
        profile_img: user.profile_image, 
        username: user.username,
        fullname: user.fullname,
        bio: user.bio,
        userId: user._id
    };
};

// 2. Signup Controller
export const signup = async (req, res) => {
    let { fullname, email, password } = req.body; 

    // Basic validation logic
    if (!fullname || fullname.length < 3) {
        return res.status(403).json({ "error": "Fullname must be at least 3 letters long" });
    }
    if (!email || !email.length) {
        return res.status(403).json({ "error": "Enter Email" });
    }
    if (!password || password.length < 6) {
        return res.status(403).json({ "error": "Password should be at least 6 characters long" });
    }

    try {
        // Hash the password for security
        const hashed_password = await bcrypt.hash(password, 10);
        
        // Generate a unique username from email
        const username = email.split("@")[0] + Math.floor(Math.random() * 1000);

        const newUser = new User({
            fullname,
            email,
            password: hashed_password,
            username
        });

        const user = await newUser.save();
        return res.status(200).json(formatDatatoSend(user)); 

    } catch (err) {
        // Handle duplicate email error
        if (err.code === 11000) {
            return res.status(500).json({ "error": "Email already exists" });
        }
        return res.status(500).json({ "error": err.message });
    }
};

// 3. Signin Controller
export const signin = async (req, res) => {
    let { email, password } = req.body;

    try {
        // Find user by email in the flat schema
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ "error": "Email not found" });
        }

        // Compare the provided password with the hashed password in the DB
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(403).json({ "error": "Incorrect password" });
        }

        // Send back the user data and access token
        return res.status(200).json(formatDatatoSend(user));

    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};