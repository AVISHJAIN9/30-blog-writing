import express from 'express';
import { 
    createBlog, 
    latestBlogs, 
    searchBlogs,
    getBlogById,
    likeBlog, 
    addComment 
} from '../controllers/blog.controller.js'; 
import verifyJWT from '../middleware/verifyjwt.js'; 

const router = express.Router();

// --- Public Routes ---
// These do not require a login
router.post("/latest-blogs", latestBlogs);
router.post("/search-blogs", searchBlogs);
router.post("/get-blog", getBlogById);

// --- Private Routes ---
// These require the verifyJWT middleware to pass first
router.post("/create-blog", verifyJWT, createBlog);
router.post("/like-blog", verifyJWT, likeBlog);
router.post("/add-comment", verifyJWT, addComment);

export default router;