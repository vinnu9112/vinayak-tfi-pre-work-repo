import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelpers.js"
import JWT from "jsonwebtoken"
export const registerController = async(req, res) => {
    try {
        const {name, email, password, phone, location, languages, availability, answer, role} = req.body
        if(!name){
            return res.send({message: "Name is required"})
        }
        if(!email){
            return res.send({message: "email is required"})
        }
        if(!password || password.length < 8){
            return res.send({message: "password is required and minimum 8 characters"})
        }
        if(!phone || phone.length != 10){
            return res.send({message: "Incorrect phone number"})
        }
        if(!location){
            return res.send({message: "location is required"})
        }
        if(!languages){
            return res.send({message: "languages are required"})
        }
        if(!availability){
            return res.send({message: "availability is required"})
        }
        if(!answer){
            return res.send({message: "answer is required"})
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'User with this email already registered',

            })
        }

        const hashedPassword = await hashPassword(password)

        const user = new userModel({name, email, phone, password:hashedPassword, location, languages, availability, answer, role}).save();
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        })
    } catch (error) {
        console.log(error)
            return res.status(500).send({
                success: false, 
                message: 'Error in Registration',
                error
            })        
    }
}

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message:'Invalid email or password'
            })
        }
        const user = await userModel.findOne({email});
        if(!user){ 
            return res.status(400).send({
                success: false,
                message: 'Email not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = JWT.sign({_id: user.id}, process.env.JWT_SECRET, {expiresIn:'7d'});
        res.status(200).send({
            success: true,
            message: 'loggedin successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
                role: user.role
            },
            token, 
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

export const getAllUsersController = async(req, res)=>{
    try {
        const users = await userModel.find({role: {$ne: 1}})
        res.json(users); 
    } catch (error) {
        console.log(error)
            res.status(500).send({
                success: false, 
                message: 'Error getting users',
                error
            })        
    }
}

export const forgotPasswordController = async(req, res)=>{
    try { 
        const {email, answer, newPassword} = req.body  
        if(!email){
            res.status(400).send({message:"Email is required"});
        }
        if(!answer){
            res.status(400).send({message:"Answer is required"});
        }
        if(!newPassword){
            res.status(400).send({message:"Password is required"});
        }

        const user = await userModel.findOne({email, answer})

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed})
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}
