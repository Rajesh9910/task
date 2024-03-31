const Message = require("../models/ChatModel");

const createMsg = async (req, res) => {
    try {
        const { sender, receiver, message, type, status } = req.body;

        const newMessage = new Message({
            sender,
            receiver,
            message,
            type,
            status
        });
        const savedMessage = await newMessage.save();

        res.status(201).json({ success: true, data: savedMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getMsgs = async (req, res) => {
    try {
        const { user_id } = req.body

        const messages = await Message.find({
            $or: [
                { sender: user_id },
                { receiver: user_id }
            ]
        });
        res.status(201).json({ success: true, data: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { createMsg, getMsgs }