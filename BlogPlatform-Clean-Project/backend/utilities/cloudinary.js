import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

// Logic: Configure Cloudinary with your environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (fileStr) => {
    try {
        // Logic: Uploading the image string (base64) to a specific folder
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'blog_post_banners', // Ensure this exists in your Cloudinary Settings
        });
        
        // This is the URL we save to MongoDB
        return uploadResponse.url; 
    } catch (err) {
        console.error("Cloudinary Error:", err);
        return null;
    }
};