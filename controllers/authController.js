import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body;

        //validation
        if(!name){
            res.send({message:'Name is required'});
        }
        if(!email){
            res.send({message:'Email is required'});
        }
        if(!password){
            res.send({message:'Password is required'});
        }
        if(!phone){
            res.send({message:'Phone number is required'});
        }
        if(!address){
            res.send({message:'Address is required'});
        }
        if(!answer){
            res.send({message:'Answer is required'});
        }

        //check usesr
        const existingUser = await userModel.findOne({email});
        
        //existing user
        if(existingUser){
            return res.send(200).send({
                success: false,
                message:'Already Registerd please login',
            })
        }

        //register
        const hashedPassword = await hashPassword(password)

        const user = await new userModel({name,email,password:hashedPassword,phone,address,answer}).save();

        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
};

//post LOGIN
export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email not registered'
            })
        }
        const match = await comparePassword(password,user.password)

        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d',
        });
        res.status(200).send({
            success:true,
            messsage:'login successfully',
            user:{
                _id:user.id,
                name:user.name,
                email:user.email,
                address:user.address,
                phone:user.phone,
                role:user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
}

export const forgotPasswordController = async(req,res) =>{
    try {
        const {email,answer,newPassword} = req.body
        if(!email){
            res.status(400).send({message:'Email is required'})
        }
        if(!answer){
            res.status(400).send({message:'answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'New Password is required'})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong email or password'
            })
        }
        const hashedPassword = await hashPassword(newPassword);
        await userModel.findOneAndUpdate(user._id,{password:hashedPassword})
        res.status(200).send({
            success:true,
            message:'password reset sucessfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went worng',
            error
        })
    }
}

export const testController =(req,res)=>{
    try {
        res.send("protected Route");
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}