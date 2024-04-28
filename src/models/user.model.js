
import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema (
    {
     username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
     },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
         },

     fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
         },
         avatar:{
            type:String,
            required:true
         },
         coverImage:{
            type:String,
         },
         watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
         ],
         password:{
            type:String,
            required:[true,'Password is required']
         },
         refreshToken:{
            tyoe:String
         }
},{
    timestamps:true
}
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password"))  return next();

     this.password = bcrypt.hash(this,this.password,10)
     next() // ( 10 is rounds )
 // here a  plugin named  "pre" ( it is method )is used to preforming a task just before saving tha data in database  i.e.  to encrypte the password and "save " event is used bcz we are using "pre " on data saving.

    // callback  -- not use ()=> {} this type of callback bcz in arrow function javascript doesn't know the reference/context of  keyword"this".
    // that's why we use other function() bcz "save" event is performing on user. and to manipulate this we have to access user.     
})
userSchema.methods.isPasswordCorrect = async function (password){
  return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function(){
 return   jwt.sign({
        // giving payloads for sign token
        _id : this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
)                                               // sign method is used to generate token
}
userSchema.methods.generateRefreshToken = function(){
    return   jwt.sign({
        // giving payloads for sign token
        _id : this._id
        },
    process.env.REFRESH_TOKEN_SECRET,
    {
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
)
}

export const User = mongoose.model("User",userSchema)