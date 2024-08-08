import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
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


const Users = mongoose.model('Users', userSchema);
export default Users;