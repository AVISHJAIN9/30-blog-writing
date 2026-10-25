import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    blog_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        // Using a generic blog banner placeholder
        default: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg"
    },
    des: {
        type: String,
        maxlength: 200,
        required: true
    },
    content: {
        type: Array, // Stores the structured block data from your editor
    },
    tags: {
        type: [String],
        default: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users' // Matches the name used in module.exports of User.js
    },
    activity: {
        total_likes: { type: Number, default: 0 },
        total_comments: { type: Number, default: 0 },
        total_reads: { type: Number, default: 0 },
        total_parent_comments: { type: Number, default: 0 },
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comments'
    },
    draft: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: 'publishedAt' } });
export default mongoose.model("blogs", blogSchema);