import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        name : {
            type     : String,
            required : true,
        },
        
        initGraphQuery : {
            type     : String,
            required : true,
        },

        graphData : {
            type     : JSON,
            required : true,
        },
        owner : {
            type : mongoose.Schema.Types.ObjectID,
            ref  : "User"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema)