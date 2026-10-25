import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['like', 'comment', 'reply'], // Limits the action to these three types
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'blogs'
    },
    notification_for: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    },
    seen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Timestamps help show "2 minutes ago"

export default mongoose.model("notifications", notificationSchema);