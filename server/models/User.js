import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
    {
        username : {
            type     : String,
            required : true,
            unique   : true,
            min      : 2,
            max      : 50
        },

        email : {
            type     : String,
            required : true,
            unique   : true
        },

        password : {
            type     : String,
            required : true,
            min      : 6
        },
    },
    { timestamps: true }
);


export default mongoose.model("User", UserSchema)