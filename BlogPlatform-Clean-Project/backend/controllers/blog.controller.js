import Blog from '../models/blog.model.js';
import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';
import Comment from '../models/comment.model.js'; // Keep only this one!
import { nanoid } from 'nanoid';
import { uploadImage } from '../utilities/cloudinary.js';


// 1. Create Blog Logic
export const createBlog = async (req, res) => {
    let authorId = req.user; 
    let { title, des, banner, tags, content, draft } = req.body;

    if (!title.length) return res.status(403).json({ "error": "You must provide a title" });
    
    if (!draft) {
        if (!des.length || des.length > 200) return res.status(403).json({ "error": "Description must be under 200 characters" });
        if (!banner.length) return res.status(403).json({ "error": "Provide a banner to publish" });
        if (!content.length) return res.status(403).json({ "error": "Blog content cannot be empty" });
    }

    let blog_id = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-").trim().toLowerCase() + "-" + nanoid(5);

    try {
        let blog = new Blog({
            title, des, banner, content, tags, author: authorId, blog_id, draft: Boolean(draft)
        });

        const savedBlog = await blog.save();
        await User.findOneAndUpdate(
            { _id: authorId }, 
            { $push: { "blogs": savedBlog._id }, $inc: { "account_info.total_posts": 1 } }
        );

        return res.status(200).json({ id: savedBlog.blog_id });
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

// 2. Latest Blogs Logic (Home Feed)
export const latestBlogs = async (req, res) => {
    let { page } = req.body;
    let maxLimit = 5;

    try {
        const blogs = await Blog.find({ draft: false })
            .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
            .sort({ "publishedAt": -1 })
            .select("blog_id title des banner tags publishedAt -_id")
            .skip((page - 1) * maxLimit)
            .limit(maxLimit);

        return res.status(200).json({ blogs });
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

// 3. Search Blogs Logic
export const searchBlogs = async (req, res) => {
    let { tag, query, page } = req.body;
    let findQuery = { draft: false };

    if (tag) {
        findQuery.tags = tag;
    } else if (query) {
        findQuery.title = new RegExp(query, "i");
    }

    let maxLimit = 5;

    try {
        const blogs = await Blog.find(findQuery)
            .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
            .sort({ "publishedAt": -1 })
            .select("blog_id title des banner tags publishedAt -_id")
            .skip((page - 1) * maxLimit)
            .limit(maxLimit);

        return res.status(200).json({ blogs });
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

// 4. Like Blog Logic
export const likeBlog = async (req, res) => {
    let user_id = req.user;
    let { _id, isLikedByUser } = req.body;

    let incrementVal = !isLikedByUser ? 1 : -1;

    try {
        const blog = await Blog.findOneAndUpdate(
            { _id }, 
            { $inc: { "activity.total_likes": incrementVal } },
            { new: true }
        );

        if (!isLikedByUser) {
            const notification_for = blog?.author;
            if (notification_for && notification_for.toString() !== user_id.toString()) {
                let likedNotification = new Notification({
                    type: "like",
                    blog: _id,
                    notification_for,
                    user: user_id
                });
                await likedNotification.save();
            }
        } else {
            await Notification.findOneAndDelete({ user: user_id, blog: _id, type: "like" });
        }

        return res.status(200).json({ liked: !isLikedByUser });
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

// 5. Add Comment Logic
export const addComment = async (req, res) => {
    let user_id = req.user;
    let { _id, comment, blog_author, replying_to } = req.body;

    if (!comment.length) return res.status(403).json({ "error": "Write something to leave a comment" });

    let commentObj = {
        blog_id: _id,
        blog_author,
        comment,
        commented_by: user_id,
    };

    if (replying_to) {
        commentObj.parent = replying_to;
        commentObj.isReply = true;
    }

    try {
        const savedComment = await new Comment(commentObj).save();

        await Blog.findOneAndUpdate(
            { _id }, 
            { 
                $push: { "comments": savedComment._id }, 
                $inc: { "activity.total_comments": 1, "activity.total_parent_comments": replying_to ? 0 : 1 } 
            }
        );

        // Determine who should receive the notification
        let notification_for = null;
        if (replying_to) {
            const parentComment = await Comment.findOne({ _id: replying_to });
            notification_for = parentComment?.commented_by || null;
        } else {
            notification_for = blog_author || null;
        }

        // Only create a notification if we have a target and it's not the actor themself
        if (notification_for && notification_for.toString() !== user_id.toString()) {
            let notificationObj = {
                type: replying_to ? "reply" : "comment",
                blog: _id,
                notification_for,
                user: user_id,
                comment: savedComment._id
            };

            await new Notification(notificationObj).save();
        }

        return res.status(200).json({
            comment,
            commented_by: user_id,
            at: savedComment.commentedAt,
            _id: savedComment._id
        });
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

// 6. Get Blog by ID Logic
export const getBlogById = async (req, res) => {
    let { blog_id } = req.body;

    try {
        const blog = await Blog.findOne({ blog_id })
            .populate("author", "username profile_image fullname bio -_id")
            .populate({
                path: "comments",
                select: "comment commented_by commentedAt",
                populate: { path: "commented_by", select: "username profile_image -_id" }
            });

        if (!blog) {
            return res.status(404).json({ "error": "Blog not found" });
        }

        await Blog.findOneAndUpdate(
            { blog_id },
            { $inc: { "activity.total_reads": 1 } }
        );

        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

// 7. Get Profile Logic

export const getProfile = async (req, res) => {
    let { username } = req.body;

    try {
        const user = await User.findOne({ "personal_info.username": username })
            .select("-personal_info.password -google_auth -updatedAt");

        if (!user) return res.status(404).json({ "error": "User not found" });

        const blogs = await Blog.find({ author: user._id, draft: false })
            .select("blog_id title des banner tags publishedAt -_id")
            .sort({ publishedAt: -1 });

        return res.status(200).json({ user, blogs });
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};
