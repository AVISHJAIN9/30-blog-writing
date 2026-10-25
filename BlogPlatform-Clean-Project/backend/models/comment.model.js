import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'blogs'
    },
    comment: {
        type: String,
        required: true
    },
    commented_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
}, { 
    timestamps: { createdAt: 'commentedAt' } 
});

export default mongoose.model("comments", commentSchema);