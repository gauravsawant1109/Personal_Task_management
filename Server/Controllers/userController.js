import mongoose from "mongoose";
// import User from "../models/userModel"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import User from "../models/userModel.js";
async function register(req, res) {
    try {
        console.log("register from register", req.body);
        const email = req.body.email;


        const existUser = await User.findOne({ email: email });
        if (!existUser) {
            const newUser = new User(req.body);


            await newUser.save();
            res.status(202).send({ message: "Registration Successfully", success: true });
        } else {
            res.status(201).send({ message: "User Already Registered", success: false })
        }
    } catch (error) {
        res.status(500).send({ message: "Server Error", success: false })
    }
}
async function login(req, res) {
    try {
        console.log(req.body);

        const { email, password } = req.body;
        const existUser = await User.findOne({ email });

        console.log("existUser", existUser);
        if (!existUser) {
            return res.status(401).send({ message: "Invalid email", success: false });
        }

        const isMatch = await existUser.matchPassword(password);
        console.log("existUser's id:", existUser._id);

        if (!isMatch) {
            return res.status(401).send({ message: "Incorrect password", success: false });
        }

        const token = jwt.sign(
            { id: existUser._id, name: existUser.name },
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        return res.status(202).send({ success: true, message: "Login Successful", token: token });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send({ message: "Server Error", success: false });
    }
}

async function getUserInfo(req, res) {
    const id = req.user.id
    const loggedUser = await User.findOne({ _id: id })


    res.status(202).send({ message: "user Info get Successfully ", success: true, loggedUser: loggedUser })
}




export default { register, login, getUserInfo
    }