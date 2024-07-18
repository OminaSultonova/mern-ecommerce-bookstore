// src/models/user.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likedItems: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

const User = mongoose.model('User', userSchema);

export default User;
