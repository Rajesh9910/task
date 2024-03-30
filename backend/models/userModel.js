const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'completed'],
        default: 'todo'
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

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
