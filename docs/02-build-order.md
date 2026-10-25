# Step-by-Step Build Order

## Rebuilding the Platform from Scratch

### Phase 1: Environment & Backend Scaffolding
1. Initialize Node.js ES module project (`package.json` with `"type": "module"`).
2. Install core dependencies: `express`, `mongoose`, `dotenv`, `cors`, `bcrypt`, `jsonwebtoken`, `cloudinary`, `nanoid`.
3. Create `backend/server.js` with CORS, JSON body parser, and Mongoose connection handlers.

### Phase 2: Domain Modeling & Database Schemas
1. Create `backend/models/user.model.js` with email uniqueness and hashed password fields.
2. Create `backend/models/blog.model.js` with slug indexes, tags array, draft boolean, and engagement counters.
3. Create `backend/models/comment.model.js` and `notification.model.js`.

### Phase 3: Authentication & Middleware Layer
1. Build `backend/controllers/auth.controller.js` for registration and login.
2. Build `backend/middleware/auth.middleware.js` for Bearer token validation.
3. Wire auth routes in `backend/routes/auth.routes.js`.

### Phase 4: Blog Content & Media Engine
1. Configure Cloudinary client in `backend/utilities/cloudinary.js`.
2. Implement CRUD controllers in `backend/controllers/blog.controller.js` with Nanoid slug generation.
3. Implement like, comment, and tag search routes in `backend/routes/blog.routes.js`.

### Phase 5: Frontend Vite & 3D Spatial Canvas Setup
1. Initialize React 19 Vite application with Tailwind CSS v4.
2. Install 3D and animation dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `@studio-freight/lenis`, `gsap`, `framer-motion`.
3. Implement `frontend/src/components/scene3d.jsx` with responsive WebGL mesh and lighting.

### Phase 6: Kinetic Physics & Smooth Scrolling
1. Implement `frontend/src/components/smoothscroll.jsx` wrapping application roots with Lenis.
2. Implement `frontend/src/components/cursor.jsx` and `magnetic.jsx` for spring micro-physics.

### Phase 7: UI Pages & Community Interaction
1. Build `home.jsx`, `feed.jsx`, `createblog.jsx`, `blogdetail.jsx`, and `myposts.jsx`.
2. Connect frontend Axios client to backend REST endpoints.
