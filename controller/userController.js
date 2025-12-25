import fs from 'fs'
import { User } from '../models/userModel.js';
export const createUser= async (req, res)=>{
    try {
        const {name, email, age } = req.body
        const profileImage=req.file;

        const user=await User.create({
            name, 
            email,
            age,
            profileImage:profileImage ? profileImage.path:null
        })

        const baseUrl = `${req.protocol}://${req.get("host")}`;

    res.status(201).json({
      success: true,
      user: {
        ...user.toObject(),
        profileImage: user.profileImage
          ? `${baseUrl}/${user.profileImage}`
          : null,
      },
    });
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}

// Get All users

export const getUsers= async(req, res)=>{
    try {
        const users=await User.find()
       const baseUrl = `${req.protocol}://${req.get("host")}`;

    const userList = users.map(user => ({
      ...user.toObject(),
      profileImage: user.profileImage
        ? `${baseUrl}/${user.profileImage}`
        : null,
    }));

    res.json({ success: true, users: formatted }); 
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
}

//update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const profileImage = req.file;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete old image if new one uploaded
    if (profileImage && user.profileImage && fs.existsSync(user.profileImage)) {
      fs.unlinkSync(user.profileImage);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;
    if (profileImage) user.profileImage = profileImage.path;

    await user.save();

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.json({
      success: true,
      user: {
        ...user.toObject(),
        profileImage: user.profileImage
          ? `${baseUrl}/${user.profileImage}`
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete profile image
    if (user.profileImage && fs.existsSync(user.profileImage)) {
      fs.unlinkSync(user.profileImage);
    }

    await user.deleteOne();
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
