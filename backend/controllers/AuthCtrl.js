const User = require("../models/userModel")

const LoginCtrl = async (req, res) => {
    try {
        const { email, password, } = req.body

        const foundUser = await User.findOne({ email: email })

        if (!foundUser) {
            res.json({ success: false, message: "User not found" })
        } else if (password !== foundUser.password) {
            res.json({ success: false, message: "Incorrect password" })
        }
        else {
            res.status(200).json({ success: true, message: "Login Success", data: foundUser })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const RegisterCtrl = async (req, res) => {
    try {
        const { email } = req.body

        const foundUser = await User.findOne({ email: email })

        if (foundUser) {
            res.status(400).json({ success: false, message: "User already exists" })
        } else {
            const newUser = await User.create(req.body)
            res.status(200).json({ success: true, message: "Registration Success", data: newUser })
        }

    } catch (error) {
        console.log(error)
    }
}

const getUserCtrl = async (req, res) => {
    try {
        const { id } = req.body
        const foundUser = await User.findById(id)
        if (!foundUser) {
            res.json({ success: false, message: "User not found" })
        } else {
            const userObj = foundUser.toObject();
            delete userObj.password;

            res.status(200).json({ success: true, message: "Registration Success", data: userObj })
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = { LoginCtrl, RegisterCtrl, getUserCtrl }