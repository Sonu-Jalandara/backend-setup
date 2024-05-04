import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler ( async (req,res) =>{
    // res.status(200).json({
    //     message:"chai and backend"
    // })

//  get user details from user i.e. username, email, password, avatar, images etc.
//  validation -- not empty, email format 
//  check  wheather user already exists via  email, username
//  check for image , check for avatar 
//  upload them to cluodinary , check image and avatar successfully uploaded on cloudinary
//  create user object -- create entry in db
//  remove password and refresh token from response
// check user is created or not
//  return response
  

// getting user data
 const { fullName, username, email ,password} = req.body
//  console.log("email:", "sonu@123");  
 console.log("email:",email);

 // validation 
 if (
    [fullName,username,email,password].some((fields) =>
       fields?.trim() === ""
    )) {
    throw new ApiError(400,"All fields are required")
 }

   // check user already exists or not 

const existedUser =   User.findOne({
    $or:[
        { username },{ email }
    ]
  }
  )
  if ( existedUser ) {
    throw new ApiError(409," User already exists with email or username");
  }


 //   check for image , check for avatar 
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required");
  }

  //upload them to cluodinary ,
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   //  check image and avatar successfully uploaded on cloudinary
   if (!avatar) {
    throw new ApiError(400,"Avatar file is required");
    
   }

   //  create user object -- create entry in db
 const user = await  User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
})



//  remove password and refresh token from response
 const createdUser = await User.findById(user._id).select(
"-password -refreshToken"
 )

 // check user is created or not
 if(!createdUser){
    throw new ApiError(500,"Something went wrong while registrating the user")
 }

 // return res

 return res.status(201).json(
    new ApiResponse (200,createdUser,"User registered successfully")
 )
})

export { registerUser , }