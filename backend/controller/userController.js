import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import createToken from '../utils/createToken.js'

const createUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        throw new Error("Please fill all inputs.")
    }

    const userExist = await User.findOne({email});
    if (userExist) return res.status(400).send("User already exists");


    const hashedPasssword = await bcrypt.hash(password, 10)

    const newUser = new User({username, email, password: hashedPasssword})
    try{
        await newUser.save()
        createToken(res, newUser._id)
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        }
    )
    }
    catch(error) {
        console.error(error); // Log the error message
        res.status(400).send("Invalid User Data");
    }
    
});


const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser) {
        const isPassword = await bcrypt.compare(password, existingUser.password)
        if(isPassword){
            createToken(res, existingUser._id)

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            })
            return //Exite the function after sending the response.
        }
    }
})


const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
    });

const getAllUsers = asyncHandler(async (req, res)=>{
    const users =  await User.find({});
    res.json(users)
})


const getCurrentUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }else{
        res.status(404)
        throw new Error ('User not found')
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.username  = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const hashedPasssword = await bcrypt.hash(req.body.password, 10)
            user.password = hashedPasssword
        }

        const ubdatedUser = await user.save();

        res.json({
            _id: ubdatedUser._id,
            username: ubdatedUser.username,
            email: ubdatedUser.email,
            isAdmin: ubdatedUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error ("User Not Found!!")
    }
})


const deleteUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id)

    if (user) {
        if(user.isAdmin){
            res.status(400)
            throw new Error("Cannot Delete Admin User")
        }

        await User.deleteOne({_id: user._id})
        res.json({message: "User Removed"})
    }else{
        res.status(404);
        throw new Error ("User Not Found")
    }
})


const getUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
};