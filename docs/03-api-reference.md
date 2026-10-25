# API Reference: Next-Gen Creative Blog Platform

## Base URL: `http://localhost:3001/api/v1`

| Method | Endpoint | Auth Required | Purpose | Status Codes |
|---|---|---|---|---|
| `POST` | `/auth/signup` | No | Register new author account | `201`, `400`, `409` |
| `POST` | `/auth/login` | No | Authenticate user & issue JWT | `200`, `400`, `401` |
| `GET` | `/blogs` | No | Fetch published blogs with pagination & tag filters | `200`, `500` |
| `GET` | `/blogs/:slug` | No | Fetch complete blog details by slug | `200`, `404` |
| `POST` | `/blogs` | Yes (Bearer) | Create new blog draft / article | `201`, `400`, `401` |
| `PUT` | `/blogs/:id` | Yes (Author) | Update authored article content | `200`, `403`, `404` |
| `DELETE` | `/blogs/:id` | Yes (Author) | Delete article and cascade linked data | `200`, `403`, `404` |
| `POST` | `/blogs/:id/like` | Yes (Bearer) | Upvote / applaud article | `200`, `401` |
| `POST` | `/blogs/:id/comment`| Yes (Bearer) | Post comment to article | `201`, `400`, `401` |
| `GET` | `/users/:id` | No | Fetch public author profile and stories | `200`, `404` |
| `GET` | `/debug/health` | No | Health check and server status | `200` |
