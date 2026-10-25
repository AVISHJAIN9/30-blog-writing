# Project Map: Next-Gen Creative Blog Platform

## Folder Tree
```
36-blog-wrriting/
├── BlogPlatform-Clean-Project/
│   ├── backend/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js        # Authentication & registration logic
│   │   │   ├── blog.controller.js        # Blog CRUD, likes, comments, tag search
│   │   │   ├── debug.controller.js       # Health check and environment verification
│   │   │   └── user.controller.js        # Profile retrieval and user stats
│   │   ├── middleware/
│   │   │   └── auth.middleware.js        # JWT header extraction & token verification
│   │   ├── models/
│   │   │   ├── blog.model.js             # Story document schema (slug, content, tags)
│   │   │   ├── comment.model.js          # Nested comment schema
│   │   │   ├── notification.model.js     # User interaction alerts schema
│   │   │   └── user.model.js             # User identity, password, social links
│   │   ├── routes/
│   │   │   ├── auth.routes.js            # /api/v1/auth endpoints
│   │   │   ├── blog.routes.js            # /api/v1/blogs endpoints
│   │   │   ├── debug.routes.js           # /api/v1/debug endpoints
│   │   │   └── user.routes.js            # /api/v1/users endpoints
│   │   ├── utilities/
│   │   │   └── cloudinary.js             # Cloudinary SDK configuration
│   │   ├── server.js                     # Express bootstrap, CORS, Mongoose connection
│   │   └── package.json                  # Express 4.19.2, Mongoose 8.3.0, bcrypt, JWT
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── cursor.jsx            # Custom kinetic dot & ring cursor
│   │   │   │   ├── magnetic.jsx          # Spring-physics magnetic attraction wrapper
│   │   │   │   ├── navbar.jsx            # Responsive navigation header
│   │   │   │   ├── pagewrapper.jsx       # Framer Motion page transition container
│   │   │   │   ├── scene3d.jsx           # Three.js / R3F interactive 3D hero mesh
│   │   │   │   ├── search.jsx            # Real-time search modal & input
│   │   │   │   └── smoothscroll.jsx      # Lenis virtual scroll wrapper
│   │   │   ├── pages/
│   │   │   │   ├── blogdetail.jsx        # Story reader with like/comment engine
│   │   │   │   ├── createblog.jsx        # Author publishing & draft studio
│   │   │   │   ├── feed.jsx              # Paginated article feed with tag filters
│   │   │   │   ├── home.jsx              # Landing hero with 3D canvas
│   │   │   │   ├── login.jsx             # User authentication form
│   │   │   │   ├── myposts.jsx           # Author story management & deletion
│   │   │   │   ├── profile.jsx           # User bio and authored articles
│   │   │   │   ├── search.jsx            # Tag and keyword discovery results
│   │   │   │   └── signup.jsx            # New author onboarding form
│   │   │   ├── context/
│   │   │   │   └── authcontext.jsx       # Global user state & JWT token store
│   │   │   ├── App.jsx                   # React Router v7 route definitions
│   │   │   └── main.jsx                  # React 19 root DOM mount
│   │   └── package.json                  # React 19, Three.js, R3F, Lenis, Vite
│   └── package.json                      # Workspace orchestrator scripts
└── docs/                                 # VitePress documentation portal
```

## Dependencies & Rationale
| Package | Version | Purpose |
|---|---|---|
| `react` | 19.2.0 | Next-generation React core with enhanced compiler optimization |
| `three` | 0.183.1 | WebGL 3D graphics rendering engine for spatial hero elements |
| `@react-three/fiber` | 9.5.0 | Declarative Three.js scene graph component binding for React |
| `@react-three/drei` | 10.7.7 | Pre-built shaders, controls, and mesh utilities for R3F |
| `@studio-freight/lenis` | 1.0.42 | High-performance 60fps smooth scrolling with momentum physics |
| `framer-motion` | 12.34.3 | Declarative page transition animations and kinetic UI |
| `gsap` | 3.14.2 | High-precision timeline tweening and timeline triggers |
| `express` | 4.19.2 | Minimalist backend HTTP application framework |
| `mongoose` | 8.3.0 | Object Document Mapper for MongoDB data modeling and validation |
| `jsonwebtoken` | 9.0.2 | Cryptographic stateless JWT token creation and verification |
| `bcrypt` | 5.1.1 | Password hashing with adaptive work factor salt rounds |
| `cloudinary` | 2.2.0 | Cloud media optimization and CDN image hosting SDK |
| `nanoid` | 5.0.0 | Collision-resistant URL slug generator |
