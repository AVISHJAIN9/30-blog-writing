
# Project Development Checklist (Detailed)

This expanded checklist documents the entire codebase and the developer tasks you'll need for features, testing, debugging, deployment and maintenance.

## Quick Links
- Backend folder: blog/backend
- Frontend folder: blog/frontend
- Run backend: from blog root `npm run dev` (runs `nodemon backend/server.js`)
- Run frontend: from blog/frontend `npm run dev` (Vite)

---

## 1. Environment & Setup

- Required tools
  - Node.js v18+ (use nvm to manage versions)
  - npm or yarn
  - MongoDB (local or host) running and accessible via `MONGO_URL`

- Environment variables (`backend/.env`)
  - `PORT` (default 3001)
  - `MONGO_URL` (mongodb connection string)
  - `JWT_SECRET` (string)
  - Optional: Cloudinary keys (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)

- Install and start
  - Backend: `cd blog && npm install && npm run dev`
  - Frontend: `cd blog/frontend && npm install && npm run dev`

---

## 2. Models (Complete Reference)

All models live in `backend/models` — below are fields you should keep in mind for development and validation.

User (users)
- `_id`
- `fullname` (String, required)
- `email` (String, required, unique)
- `password` (String, hashed)
- `username` (String, unique)
- `bio` (String)
- `profile_image` (String)
- `social_links` (Object)
- `account_info` (Object: total_posts, total_reads)
- `blogs` (ObjectId[])

Blog (blogs)
- `_id`
- `title`, `des`, `content`, `banner`, `tags` (Array)
- `author` (ObjectId ref users)
- `blog_id` (String slug)
- `draft` (Boolean)
- `activity` (Object: total_likes, total_comments, total_reads)
- `comments` (ObjectId[])
- `publishedAt`, `createdAt`, `updatedAt`

Comment (comments)
- `_id`
- `blog_id` (ObjectId ref blogs)
- `blog_author` (ObjectId ref users)
- `comment` (String)
- `commented_by` (ObjectId ref users)
- `parent` (ObjectId ref comments) optional
- `isReply` (Boolean)
- `commentedAt` timestamp

Notification (notifications)
- `_id`
- `type` (enum: like, comment, reply)
- `blog` (ObjectId ref blogs)
- `notification_for` (ObjectId ref users) — required
- `user` (ObjectId ref users) — actor
- `comment`/`reply` (ObjectId ref comments) optional
- `seen` (Boolean)
- timestamps

Other supporting collections: logs, drafts, uploads (if present).

---

## 3. Routes & Controllers (Complete Endpoints)

Auth (backend/routes/auth.routes.js)
- `POST /api/auth/signup` — create user, return token and user payload
- `POST /api/auth/signin` — verify credentials, return token and user payload

Blog (backend/routes/blog.routes.js)
- `POST /api/blog/create` — create a new blog (auth)
- `POST /api/blog/latest-blogs` — paginated feed
- `POST /api/blog/search-blogs` — search by tag or query
- `POST /api/blog/like` — toggle like and create/remove like notification
- `POST /api/blog/add-comment` — add comment or reply and create notification
- `POST /api/blog/get-by-id` — fetch blog by blog_id (with populated comments)

User (backend/routes/user.routes.js)
- `POST /api/user/get-profile` — get public profile and user's blogs
- `POST /api/user/update-profile` — update bio/profile image (auth)

Debug (backend/routes/debug.routes.js)
- `GET /api/debug/status` — diagnostics (DB readyState, env flags)

Controllers implement input validation, error handling, and use Mongoose for DB operations. Keep error messages consistent: `{ error: 'message' }`.

---

## 4. Middleware & Utilities

- `middleware/verifyjwt.js` — verify Bearer JWT, set `req.user` to user id
- `utilities/cloudinary.js` — image upload helper (returns URL)
- Helpers: `slugify` for blog_id, pagination helper, error formatting utility

Security considerations
- Ensure JWT expiry and revocation (optional refresh tokens)
- Sanitize and validate inputs to avoid injection attacks
- Limit file sizes and validate image types for uploads

---

## 5. Frontend — Pages & Components (Feature Map)

Pages (`src/pages`):
- `home.jsx` — marketing/home page
- `feed.jsx` — paginated list of posts
- `blogdetail.jsx` — single post with comments and actions
- `createblog.jsx` — editor + image upload
- `profile.jsx` — view/update profile
- `signup.jsx`, `login.jsx` — auth flows
- `myposts.jsx` — manage user's posts

Components (`src/components`):
- `Navbar.jsx` — navigation + auth status
- `Search.jsx` — global search modal
- `Cursor.jsx`, `SmoothScroll.jsx`, `Scene3D.jsx` — UI polish
- `PageWrapper.jsx` — animation wrapper for pages

Context & State
- `UserContext.jsx` — stores `userAuth` + `setUserAuth`
- Consider adding a `NotificationContext` if notifications are displayed client-side

Recommended `src/utils/api.js` (create this):
- Central axios instance with `baseURL` = `http://localhost:3001`
- Request interceptor to attach `Authorization: Bearer <token>` from localStorage
- Response interceptor to handle global errors (401 redirect to login)

---

## 6. Feature Checklist (Detailed) — implement & test each sub-item

Auth
- Client-side validation
- Server-side validation and meaningful error messages
- Persist token in `localStorage` and set in headers
- Logout clears context and storage

Blog
- Create: title, banner upload, content editor, tags
- Edit/Delete: verify ownership on backend
- Publish/Draft flow

Comments
- Add comment, reply functionality
- Prevent empty comments
- Notification generation when appropriate (not for actor)

Likes
- Toggle with optimistic updates
- Notifications created/removed

Profile
- View and edit (bio, image)

Search & Tags
- Server-side search, client-side debounce

Notifications UI
- List notifications, mark seen, link to relevant content

Accessibility
- Ensure forms have labels, keyboard navigation, and good contrast

---

## 7. Acceptance Criteria Examples

- Signup: returns 200 + access_token; UI stores token and navigates to feed
- Add Comment: comment appears in UI and backend returns `_id` and timestamp
- Like: like count increments and notification created (if applicable)

---

## 8. Testing & Debugging

- Useful curl examples
```bash
curl -i -X POST http://localhost:3001/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"fullname":"Test","email":"t@t.com","password":"123456"}'

curl http://localhost:3001/api/debug/status
```

- Browser: open devtools → Network & Console to inspect responses and client errors
- Server: tail nodemon output for backend logs

---

## 9. Deployment & CI Suggestions

- Dockerize backend and frontend
- CI pipeline: lint → tests → build → publish
- Keep secrets in environment variables or a secret manager

---

## 10. Prioritized Roadmap (Concrete Tasks)

1. Harden Auth (signup/signin/token lifecycle) — add tests and defensive client handling
2. Centralize API client (`src/utils/api.js`) — attach token and global error handling
3. Blog create/edit + image uploads — integrate Cloudinary helper
4. Comments + notifications — ensure `notification_for` guarded and notifications UI
5. Add seed script for dev data
6. Add E2E smoke tests (Cypress/Playwright)

---

## 11. Next Actions I can implement for you
- Create `frontend/src/utils/api.js` and wire it into pages
- Generate a `README.md` with quick-start and curl examples
- Add a DB seed script (`backend/scripts/seed.js`) to populate sample data

Tell me which one you want next and I'll implement it.

