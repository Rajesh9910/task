const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Number,
    },
    endDate: {
        type: Number,
    },
    reminderDate: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        default: 'todo'
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: false });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [taskSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const User = mongoose.model('User', userSchema, "users");

module.exports = User;
