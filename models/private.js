import e from "express";
import mongoose from "mongoose";

const privateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    subscriptionType: {
        enum: ['free', 'Silver', 'Gold'],
        default: 'free'
    },
    subscriptionDate: {
        type: Date,
        default: Date.now()
    },
    expireDate: {
        type: Date
    },
    paymentMethod: {
        type: String
    },
    paymentInfo: {
        cardNumber: {
            type: Number
        }
    },
    credits: {
        type: Number,
        default: 10000
    },



}, { timestamps: true });

export const Private = mongoose.model('Private', privateSchema);