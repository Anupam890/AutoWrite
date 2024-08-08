import Users from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Users({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        // Token Generation
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set token in cookie
        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true
        });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const GenerateOtp = () => {
    const digitGen = Math.floor();
    console.log(digitGen);
}

const verifyUser = async(req, res) => {

}

const loginUser = async(req, res) => {

}

//  Third Party Authentication

// passport.use(new Strategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback'
// }, async(accessToken, refreshToken, profile, done) => {
//     try {
//         const existingUser = await Users.findOne({ email: profile.emails[0].value });
//         if (existingUser) {
//             return done(null, existingUser);
//         }

//         const newUser = new Users({
//             name: profile.displayName,
//             email: profile.emails[0].value,

//         });

//         await newUser.save();
//         done(null, newUser);
//     } catch (error) {
//         done(error, null);
//     }
// }));


export {
    registerUser,
    GenerateOtp
};