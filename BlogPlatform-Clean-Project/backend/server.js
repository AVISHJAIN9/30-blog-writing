import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

// 1. Initialize the server FIRST
const server = express(); 
let PORT = process.env.PORT || 3001; // Using 3001 as per your terminal success

// 2. Setup Middlewares
server.use(cors()); // Moved this below the server initialization
server.use(express.json());

// 3. Import Routes (Must happen after 'server' is defined or at the top)
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import userRoutes from './routes/user.routes.js';
import debugRoutes from './routes/debug.routes.js';

server.use(express.json()); // This allows the server to read the data from your HTML tester
server.use(cors());

// 4. Database Connection
mongoose.connect(process.env.MONGO_URL, {
    autoIndex: true,
})
.then(() => console.log("Connected to MongoDB ✅"))
.catch(err => console.log("Database Connection Error ❌: ", err));

// 5. Route Setup
server.get('/', (req, res) => res.json({ status: 'ok', service: 'Blog Platform API' }));
server.use("/api/auth", authRoutes);
server.use("/api/blog", blogRoutes);
server.use("/api/user", userRoutes);
server.use("/api/debug", debugRoutes);

// 6. Start Listening
server.listen(PORT, '0.0.0.0', () => {
    console.log('Server is running on port 🚀: ' + PORT);
});