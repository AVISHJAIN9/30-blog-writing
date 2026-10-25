# 🧪 API Testing Guide

## Backend Running On: http://localhost:3001

### Authentication Endpoints

#### Sign Up
```bash
POST http://localhost:3001/api/auth/signup
Content-Type: application/json

{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGc...",
  "email": "john@example.com",
  "username": "john123",
  "fullname": "John Doe",
  "profile_img": "https://...",
  "bio": "",
  "userId": "507f1f77bcf86cd799439011"
}
```

#### Sign In
```bash
POST http://localhost:3001/api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: (Same as signup)
```

---

### Blog Endpoints

#### Get Latest Blogs
```bash
POST http://localhost:3001/api/blog/latest-blogs
Content-Type: application/json

{
  "page": 1
}

Response:
{
  "blogs": [
    {
      "blog_id": "my-first-blog-abc12",
      "title": "My First Blog",
      "des": "This is a great blog post",
      "banner": "https://...",
      "tags": ["javascript", "react"],
      "publishedAt": "2024-02-21T10:30:00Z",
      "author": {
        "username": "johndoe",
        "profile_image": "https://...",
        "fullname": "John Doe"
      }
    }
  ]
}
```

#### Search Blogs
```bash
POST http://localhost:3001/api/blog/search-blogs
Content-Type: application/json

{
  "query": "javascript",
  "tag": "react",
  "page": 1
}
```

#### Get Single Blog
```bash
POST http://localhost:3001/api/blog/get-blog
Content-Type: application/json

{
  "blog_id": "my-first-blog-abc12"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "blog_id": "my-first-blog-abc12",
  "title": "My First Blog",
  "des": "...",
  "banner": "https://...",
  "content": [
    {"type": "text", "value": "Blog content here..."}
  ],
  "author": {
    "_id": "...",
    "username": "johndoe",
    "profile_image": "...",
    "fullname": "John Doe",
    "bio": "..."
  },
  "tags": ["javascript", "react"],
  "comments": [
    {
      "_id": "...",
      "comment": "Great post!",
      "commented_by": {
        "username": "user123",
        "profile_image": "..."
      },
      "commentedAt": "2024-02-21T11:00:00Z"
    }
  ],
  "activity": {
    "total_likes": 5,
    "total_comments": 2,
    "total_reads": 100
  },
  "publishedAt": "2024-02-21T10:30:00Z"
}
```

#### Create Blog (Protected)
```bash
POST http://localhost:3001/api/blog/create-blog
Content-Type: application/json
Authorization: Bearer eyJhbGc...

{
  "title": "My Awesome Post",
  "des": "This is a great post about JavaScript",
  "banner": "https://example.com/image.jpg",
  "tags": ["javascript", "web-development"],
  "content": [
    {"type": "text", "value": "Full blog content here..."}
  ],
  "draft": false
}

Response:
{
  "id": "my-awesome-post-xyz789"
}
```

#### Like Blog (Protected)
```bash
POST http://localhost:3001/api/blog/like-blog
Content-Type: application/json
Authorization: Bearer eyJhbGc...

{
  "_id": "507f1f77bcf86cd799439011",
  "isLikedByUser": false
}

Response:
{
  "liked": true
}
```

#### Add Comment (Protected)
```bash
POST http://localhost:3001/api/blog/add-comment
Content-Type: application/json
Authorization: Bearer eyJhbGc...

{
  "_id": "507f1f77bcf86cd799439011",
  "comment": "Great post! Very informative.",
  "blog_author": "507f1f77bcf86cd799439012"
}

Response:
{
  "comment": "Great post! Very informative.",
  "commented_by": "507f1f77bcf86cd799439013",
  "at": "2024-02-21T11:30:00Z",
  "_id": "507f1f77bcf86cd799439014"
}
```

---

### User Endpoints

#### Get User Profile
```bash
POST http://localhost:3001/api/user/get-profile
Content-Type: application/json

{
  "username": "johndoe"
}

Response:
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "bio": "I love coding!",
    "profile_image": "https://...",
    "account_info": {
      "total_posts": 5,
      "total_reads": 250
    }
  },
  "blogs": [
    {
      "blog_id": "my-first-blog-abc12",
      "title": "My First Blog",
      "des": "...",
      "banner": "https://...",
      "tags": ["javascript"],
      "publishedAt": "2024-02-21T10:30:00Z"
    }
  ]
}
```

#### Update Profile (Protected)
```bash
POST http://localhost:3001/api/user/update-profile
Content-Type: application/json
Authorization: Bearer eyJhbGc...

{
  "bio": "Software developer passionate about React",
  "social_links": {
    "twitter": "https://twitter.com/johndoe",
    "github": "https://github.com/johndoe"
  }
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "fullname": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "bio": "Software developer passionate about React",
  "profile_image": "https://...",
  "social_links": {
    "twitter": "https://twitter.com/johndoe",
    "github": "https://github.com/johndoe"
  }
}
```

---

## Frontend URLs (http://localhost:5179)

| Page | URL | Protected |
|------|-----|-----------|
| Home | `/` | ❌ |
| Login | `/login` | ❌ |
| Signup | `/signup` | ❌ |
| Feed | `/feed` | ❌ |
| Blog Detail | `/blog/:blog_id` | ❌ |
| Create Post | `/create` | ✅ |
| My Profile | `/profile` | ✅ |
| User Profile | `/profile/:username` | ❌ |
| Search | `/search` | ❌ |
| My Posts | `/my-posts` | ✅ |

---

## Using Postman/Insomnia

1. Create new Collection: "Blog API"
2. Set Base URL: `http://localhost:3001/api`
3. Create requests for each endpoint
4. For protected routes, add header:
   ```
   Authorization: Bearer {access_token}
   ```

---

## Browser Testing

1. **Signup**: Go to http://localhost:5179/signup
2. **Login**: Go to http://localhost:5179/login
3. **Create Post**: Login, then go to http://localhost:5179/create
4. **View Feed**: Go to http://localhost:5179/feed
5. **View Profile**: Click username in navbar
6. **Search**: Go to http://localhost:5179/search

---

## Common Errors & Solutions

### `401 - No access token found`
- **Cause**: Protected endpoint called without Authorization header
- **Solution**: Include Bearer token in header

### `403 - Access token is invalid or expired`
- **Cause**: Invalid token or wrong JWT_SECRET
- **Solution**: Login again to get new token

### `404 - Blog not found`
- **Cause**: Blog ID doesn't exist
- **Solution**: Check blog_id is correct

### `500 - Database Connection Error`
- **Cause**: MongoDB not running
- **Solution**: Ensure MongoDB is running on port 27017

### `EADDRINUSE: address already in use`
- **Cause**: Port already in use
- **Solution**: Kill process on port: `lsof -i :3001 | kill -9`
