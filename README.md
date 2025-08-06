# 📰 Posts App API

Welcome to the **Posts App API**!  
This simple social platform allows users to register, write posts, like other posts, and leave comments.  
Perfect for practice and learning RESTful API concepts! 🚀

---

## 📦 Entity Relationship Diagram (ERD)

### 👤 Users
- `id` (Primary Key)
- `username`
- `password`

### 📝 Posts
- `id` (Primary Key)
- `title`
- `content`
- `user_id` (Foreign Key → Users)

### 👍 Likes
- `id` (Primary Key)
- `user_id` (Foreign Key → Users)
- `post_id` (Foreign Key → Posts)  
✅ Unique combination of `user_id` and `post_id` to prevent duplicate likes

### 💬 Comments
- `id` (Primary Key)
- `content`
- `user_id` (Foreign Key → Users)
- `post_id` (Foreign Key → Posts)

---

## 🌐 API Routes

### 👤 User Routes

| Method | Route             | Description            | Sample Body |
|--------|-------------------|------------------------|--------------|
| POST   | `/user/register`  | Register a new user    | `{ "username": "myUsername", "password": "myPassword" }` |
| POST   | `/user/login`     | Login as a user        | `{ "username": "myUsername", "password": "myPassword" }` |
| POST   | `/user/logout`    | Logout the user        | _No body_ |
| GET    | `/user/posts`     | Get all posts with likes and comments | _No body_ |

---

### 📝 Post Routes

| Method | Route             | Description              | Sample Body |
|--------|-------------------|--------------------------|--------------|
| POST   | `/post`           | Create a new post        | `{ "title": "Post Title", "content": "Post content" }` |
| GET    | `/post`           | Get all posts            | _No body_ |
| GET    | `/post/:postId`   | Get a specific post      | _No body_ |
| PUT    | `/post/:postId`   | Update a post            | `{ "title": "Updated Title", "content": "Updated Content" }` |
| DELETE | `/post/:postId`   | Delete a post            | _No body_ |

---

### 👍 Like Routes

| Method | Route              | Description         | Sample Body |
|--------|--------------------|---------------------|--------------|
| POST   | `/like/:postId`    | Like a post         | _No body_ |
| DELETE | `/like/:postId`    | Unlike a post       | _No body_ |
| GET    | `/like/:postId`    | Get all likes on a post | _No body_ |

---

### 💬 Comment Routes

| Method | Route                | Description                | Sample Body |
|--------|----------------------|----------------------------|--------------|
| POST   | `/comment/:postId`   | Add a comment to a post    | `{ "content": "Nice post!" }` |
| GET    | `/comment/:postId`   | Get all comments on a post | _No body_ |
| PUT    | `/comment/:commentId`| Update a comment           | `{ "content": "Updated comment." }` |
| DELETE | `/comment/:commentId`| Delete a comment           | _No body_ |

---
