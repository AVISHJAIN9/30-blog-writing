import User from '../models/user.model.js';
import Blog from '../models/blog.model.js';

// 1. Update Profile Logic
export const updateProfile = async (req, res) => {
    let { bio, social_links } = req.body;
    const bioLimit = 500;

    // Validation Logic
    if (bio && bio.length > bioLimit) {
        return res.status(403).json({ "error": `Bio cannot exceed ${bioLimit} characters` });
    }

    // Logic: Prepare the update object
    let updateObj = {
        "bio": bio,
        "social_links": social_links
    };

    try {
        // Update the User using the ID from verifyJWT middleware
        const user = await User.findOneAndUpdate(
            { _id: req.user }, 
            { $set: updateObj },
            { new: true } 
        ).select("-password");

        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

// 2. Get Public Profile Logic
export const getProfile = async (req, res) => {
    let { username } = req.body;

    try {
        // Fetch User Info - using the correct field structure from your model
        const user = await User.findOne({ username })
            .select("-password");

        if (!user) return res.status(404).json({ "error": "User not found" });

        // Fetch User's Blogs (Portfolio)
        const blogs = await Blog.find({ author: user._id, draft: false })
            .populate("author", "username profile_image -_id")
            .select("blog_id title des banner tags publishedAt -_id")
            .sort({ publishedAt: -1 });

        // Return combined data
        return res.status(200).json({
            user,
            blogs
        });

    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};