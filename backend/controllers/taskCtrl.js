const User = require("../models/userModel")

const createTask = async (req, res) => {
    try {
        const { id, title, description, startDate, endDate, type } = req.body

        const foundUser = await User.findById(id)

        if (!foundUser) {
            res.json({ success: false, message: "User not found" })
        }
        else {
            const newTask = {
                title,
                description,
                endDate: parseInt(endDate),
                startDate: parseInt(startDate),
            }
            foundUser.tasks.push(newTask)
            await foundUser.save();

            res.status(200).json({ success: true, message: "Task Created Successfully", data: foundUser })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const updateTask = async (req, res) => {
    try {
        const { user_id, reminderDate, task_id, status } = req.body
        const foundUser = await User.findById(user_id)

        if (!foundUser) {
            res.json({ success: false, message: "User not found" })
        }
        const taskToUpdate = foundUser.tasks.id(task_id)
        if (!taskToUpdate) {
            return res.json({ success: false, message: "Task not found" });
        }
        if (reminderDate) {
            taskToUpdate.reminderDate = parseInt(reminderDate);
            await foundUser.save();
            return res.status(200).json({ success: true, message: "Task updated successfully", data: foundUser });
        }
        if (status) {
            taskToUpdate.status = status
            await foundUser.save();
            return res.status(200).json({ success: true, message: `Task ${status} successfully`, data: foundUser });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


module.exports = { createTask, updateTask }