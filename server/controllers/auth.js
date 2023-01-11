import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'


// Register
export const register = async (req, res) => {
    try {
        const { username, password, email, avatarUrl} = req.body;
        
        const isUsed = await User.findOne({ username: username}) || User.findOne({ email: email});
        if (isUsed) return res.status(208).json({ message: "This `username` or `email` is used" })

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ username: username, password: passwordHash, email: email, avatarUrl: avatarUrl});
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Logging in
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
            );
        delete user.password;

        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

// Get user information autorize
export const getMe = async (req, res) => {
    try {
        const user = await User.findOne(req.user);
        if(!user) return res.status(500).json({ error: "User not found!" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        ) 

        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};