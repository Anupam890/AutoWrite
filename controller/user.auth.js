import Users from '../models/users.js';
import jwt from 'jsonwebtoken';

const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email })
        if (!existingUser) {
            res.status(400).json({ message: 'User already exists' })
        } else {
            const user = new Users({
                name,
                email,
                password
            });
            await user.save();
            //Token Generation
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('token', token, { expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });
            res.status(200).json({ message: 'User created successfully', token });
        }

    } catch (error) {
        res.json({ message: error.message });
    }


}

export {
    registerUser
}