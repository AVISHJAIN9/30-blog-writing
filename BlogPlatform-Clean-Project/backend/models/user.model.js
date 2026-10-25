import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Full name is required"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: false // Set to false so your tester works without sending a username
    },
    bio: {
        type: String,
        maxlength: [500, "Bio should not exceed 500 characters"],
        default: ""
    },
    profile_image: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
    },
    social_links: {
        youtube: { type: String, default: "" },
        instagram: { type: String, default: "" },
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        github: { type: String, default: "" },
        website: { type: String, default: "" }
    },
    account_info: {
        total_posts: { type: Number, default: 0 },
        total_reads: { type: Number, default: 0 }
    },
    blogs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'blogs',
        default: []
    }
}, { timestamps: true });

// Export the model
export default mongoose.model("users", userSchema);