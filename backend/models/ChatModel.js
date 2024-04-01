const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['regular', 'deleted', 'edited'],
        default: 'regular'
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent',
        required: true
    }
}, { versionKey: false });

// Pre-save middleware to assign auto-incrementing ID
messageSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = await this.constructor.countDocuments();
        this.id = count + 1;
    }
    next();
});
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
