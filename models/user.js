import mongoose from "mongoose";
import {Schema} from "mongoose";


const userSchema = new Schema({
    username: { 
    type: String ,
    required : true,
    unique:true
    },
    email: { 
        type: String ,
        required : true,
        unique : true,
    },
    password: { 
        type: String ,
        required : true,
    },
    files:[
        { 
            filename :{
                type: String
            },
            fileId:{
                type: Schema.Types.ObjectId,
                ref:"File"
            },
            link:{
                type: String,            
            }
       }
    ]
}, {timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;

