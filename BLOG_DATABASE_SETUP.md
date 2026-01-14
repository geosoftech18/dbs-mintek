# Blog Database Setup Guide

This guide will help you set up MongoDB integration for the blog system.

## Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB instance)
- MongoDB connection string

## Installation

The required packages are already installed:
- `mongoose` - MongoDB ODM
- `mongodb` - MongoDB driver

## Setup Steps

### 1. Get MongoDB Connection String

#### Option A: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

#### Option B: Local MongoDB
If you're running MongoDB locally:
```
mongodb://localhost:27017/blogdb
```

### 2. Create Environment Variable

Create a `.env.local` file in the root directory (if it doesn't exist) and add:

```env
MONGODB_URI=your-mongodb-connection-string-here
```

**Example:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogdb?retryWrites=true&w=majority
```

### 3. Database Structure

The blog system uses the following MongoDB schema:

```javascript
{
  title: String (required),
  content: String (required),
  excerpt: String (required, max 500 chars),
  tags: [String],
  status: 'published' | 'draft',
  featuredImage: String | null,
  slug: String (unique, auto-generated),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### 4. API Endpoints

The following API routes are available:

#### GET `/api/blog`
- Get all blogs
- Query params:
  - `status`: Filter by status ('published' | 'draft' | 'all')
  - `search`: Search in title, excerpt, or tags

#### POST `/api/blog`
- Create a new blog post
- Body: `{ title, content, tags, featuredImage, status }`

#### GET `/api/blog/[id]`
- Get a single blog by ID

#### PUT `/api/blog/[id]`
- Update a blog post
- Body: `{ title, content, tags, featuredImage, status }`

#### DELETE `/api/blog/[id]`
- Delete a blog post

#### GET `/api/blog/slug/[slug]`
- Get a blog post by slug (for public viewing)

### 5. Testing the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/blog/admin`
3. Try creating a new blog post
4. Check your MongoDB database to verify the data was saved

### 6. Troubleshooting

#### Connection Error
- Verify your `MONGODB_URI` is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure your MongoDB password doesn't contain special characters (URL encode if needed)

#### Data Not Saving
- Check browser console for errors
- Check server logs for API errors
- Verify MongoDB connection is successful

#### Slug Already Exists
- The system automatically appends a timestamp if a slug conflict occurs
- This ensures unique slugs for all blog posts

## Features

✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Automatic slug generation from title
✅ Search and filter functionality
✅ Status management (Published/Draft)
✅ Tag support
✅ Featured image support
✅ Automatic excerpt generation
✅ Timestamps (createdAt, updatedAt)

## Migration from localStorage

The system has been migrated from localStorage to MongoDB. All existing localStorage data will need to be manually migrated or recreated through the admin interface.

