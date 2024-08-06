import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const users = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    profile: {
        type: String,
        default: 'https://aui.atlassian.com/aui/9.5/docs/images/avatar-person.svg'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    },
    private: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Private'
    }
})

users.pre('save', (password) => {
    this.password = bcrypt.hashSync(this.password, 10);
})

export const Users = mongoose.model('Users', users);