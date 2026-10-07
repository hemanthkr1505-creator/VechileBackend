import Register from "../model/Register.js";
import { response } from "express";
import bcrypt from "bcrypt";

import Jsonwebtoken from "jsonwebtoken";
// import Servicemodel from "../model/Servicemodel.js";
// import { client } from "../config/Radis.js";
import { sendEmail } from "../config/mail.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Check email already exists
    const checkEmail = await Register.findOne({ email });

    if (checkEmail) {
      res.json({ success: false, message: "User email already created" });
    }

    //const bcrypt Password
    const hashpassword = await bcrypt.hash(password, 10);

    const service = await Register.create({
      name,
      email,
      password: hashpassword,
    });
    
    if (!service) {
      res.json({ success: false, message: "not created" });
    }
    client.set("users",JSON.stringify(service))

    res.json({ success: true, message: "user created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    const checkEmail = await Register.findOne({ email });

    if (!checkEmail) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const comparePassword = await bcrypt.compare(
      password,
      checkEmail.password
    );

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token only after email + password are correct
    const token = Jsonwebtoken.sign(
      { id: checkEmail._id,email:checkEmail.email },
      process.env.JWT_SECRET || "website",
      { expiresIn: "7d" }
    );
    //sendemail
    await sendEmail(checkEmail.email,"Login","Login detected on your account")
//   
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






export const getUserByID = async (req, res) => {
  try {
    const getFromRedis =JSON.parse(client.get("users"))
    const id = req.params.id;
    if (!id) {
      const find = Register.find()
      res.json({success:true,message:"user found from database",data:find})
      res.json({ success: false, message: "id not found" });
    }
    const find = await Register.findById(id);

    if (!find) {
      res.json({ success: false, message: "not found" });
    }
    res.json({
      success: true,
      message: "Clint information Recieved",
      data: find,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
/////


// =====================================================
// GET CURRENT LOGGED-IN USER
// =====================================================
export const getCurrentUser = async (req, res) => {
  try {
    console.log("CURRENT USER ID:", req.user);
    console.log("CURRENT USER EMAIL:", req.email);

    // req.user comes from JWT
    const user = await Register.findById(req.user).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Current user received",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



