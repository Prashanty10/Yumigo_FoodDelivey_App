import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        message: "Email and Password are required"
      });
    }

    const userExist = await User.findOne({ Email });

    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const matchPassword = await bcrypt.compare(
      Password,
      userExist.Password
    );

    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        email: userExist.Email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: userExist._id,
        name: userExist.Name,
        email: userExist.Email
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const handleRegister = async (req, res) => {
  try {

    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        message: "Please enter a valid email"
      });
    }

    const userExist = await User.findOne({ Email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new User({
      Name,
      Email,
      Password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.Email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Registered Successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.Name,
        email: newUser.Email
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {

    const { id } = req.params;
    const { Name, Email } = req.body;

    if (!Name || !Email) {
      return res.status(400).json({
        message: "Name and Email are required"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        Name,
        Email
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.Name,
        email: updatedUser.Email
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};


export const changePassword = async (req, res) => {
  try {

    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const matchPassword = await bcrypt.compare(
      oldPassword,
      user.Password
    );

    if (!matchPassword) {
      return res.status(400).json({
        message: "Old password is incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.Password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password Updated Successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};