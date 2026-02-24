# **Doclify — A Modern Blog Platform Built with Next.js 16**

**Doclify is an early-stage, modern blog platform built with _Next.js 16 (App Router)_.**

**_Current Version: v2_**

It currently provides essential features such as:

- Blog creation with a rich-text editor (Tiptap)
- Google OAuth authentication
- Cloudinary image uploads
- MongoDB persistence with Mongoose
- A mostly **RSC-first architecture**, with client components only where needed

The project is still in **active development**, and several areas are being improved, including:

- Caching strategies
- Data handling and performance optimization
- UI/UX polish
- Better developer experience and internal tooling

⚠️ **Note:** Update and delete functionalities for blog posts are not yet implemented.  
The developer is actively working on these features and other enhancements.

Doclify is evolving rapidly, and more refinements and improvements will be added as the project grows.

---

## 🚀 **Features**

### 🔐 Authentication

- Google OAuth via **NextAuth v5**
- Automatic author profile creation
- Session-based access to dashboard routes

### 📝 Content Management

- Rich text editing powered by **Tiptap**
- Tagging & categorization
- SEO-friendly slug generation
- Cloudinary image upload for blog thumbnails

### 🌍 Public Pages

- Blog listing
- Single post page
- Author profile
- Categories
- Tags
- Featured posts section

### 🛠️ Developer Experience

- Strict TypeScript config
- Zod schemas for input validation
- File-based routing with App Router
- React 19 with `cache()`-based data deduplication
- Tailwind CSS v4 + Design tokens
- Radix UI + shadcn components

---

## 🆕 What's New in v2

Version 2 introduces major improvements in content management, caching, performance, and user experience.

### ✏️ Post Editing System

- Full edit post functionality implemented
- Server-side validation using Zod
- Intelligent data comparison before update (only modified fields are persisted)
- Cache revalidation after successful update
- Optimized edit performance using React cache()

### 🗑️ Post Deletion

- Secure delete functionality with ownership verification
- Only the author of the post can delete it
- Cloudinary thumbnail image is automatically deleted when a post is removed
- Server-side authorization checks before deletion

### 🖼️ Cloudinary Image Cleanup

- Automatic Cloudinary asset deletion when:
  - A post is deleted
  - A thumbnail is replaced during editing
- Prevents unused image accumulation
- Keeps cloud storage clean and optimized

### 🔄 Smart Cache Handling

- Post edit cache revalidation
- Tag-based revalidation for dynamic content updates
- Improved consistency between server and UI

### 🔗 Share Functionality

- Social media share buttons added to blog pages
- Dynamic URL generation for sharing
- SEO-friendly sharing support

### 🔍 Pagination with searchParams

- Blog listing now supports pagination
- Uses Next.js searchParams for page navigation
- Improved performance for large datasets
- Cleaner URL structure (e.g., /page/2)

### 🔁 Static Params Optimization

- Implemented generateStaticParams for pre-rendered routes
- Better performance and improved SEO
- Reduced runtime computation for dynamic routes

### 🎯 Improved UX After Post Creation

- Users now see a direct link to the newly created post
- Better feedback and navigation experience

---

## 🏗️ **Technology Stack**

| Technology             | Purpose                           |
| ---------------------- | --------------------------------- |
| **Next.js 16**         | App Router, SSR, server actions   |
| **React 19**           | UI framework                      |
| **NextAuth v5**        | Authentication & session handling |
| **MongoDB + Mongoose** | Database & models                 |
| **Tiptap 3**           | Rich text editor                  |
| **Tailwind CSS v4**    | Styling system                    |
| **Cloudinary**         | Image upload & CDN                |
| **Zod**                | Validation schemas                |
| **Radix UI / shadcn**  | Component primitives              |

---

## 📂 **Project Structure**

```
📂 src
├── 📂 actions            # Server actions (business logic)
│   ├── 📂 post           # Blog post operations
│   ├── 📂 author         # Author profile operations
│   └── 📂 helper         # Validation helpers
├── 📂 app                # Next.js App Router
│   ├── 📂 (public)       # Public-facing pages
│   └── 📂 dashboard      # Protected routes
├── 📂 components         # Shared UI components
├── 📂 lib                # Config utilities (db, cloudinary, auth helpers)
├── 📂 models             # Mongoose models
├── 📂 types              # Extended TypeScript types
└── 📂 zod-schemas        # Zod validation schemas
```

---

## 🗺️ **Routing Overview**

### **Public Routes**

- `/` — Homepage
- `/blog` — All blogs
- `/blog/[slug]` — Single blog page
- `/author` — Authors
- `/author/[username]` — Author profile
- `/categories` — All categories
- `/categories/[category]` — Single Category
- `/tags` — All tags
- `/tags/[tag]` — Single tag

### **Dashboard (Authenticated)**

- `/dashboard`
- `/dashboard/me`
- `/dashboard/add-post`

---

## 🔄 **Core Flows**

### ✍️ **Blog Post Creation**

1. User writes content using Tiptap
2. Thumbnail uploaded to Cloudinary
3. Server action validates Zod schema
4. Slug generated via `slugify()`
5. Post stored in MongoDB with metadata

### 🔑 **Authentication Flow**

1. User logs in with Google
2. NextAuth callback runs
3. Checks/creates Author model
4. Session extended with username

---

## Installation

Install this app with npm

1. Clone the repository:

   ```
   git clone https://github.com/Seyam08/doclify.git
   ```

2. Navigate to the project directory:

   ```
   cd doclify
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Rename the .env-example file to .env.local and config it with own credential.

5. Start the application:

   Development version

   ```
   npm run dev
   ```

   build command

   ```
   npm run build
   ```

   preview command

   ```
   npm start
   ```

6. Open the package.json file to see all the scripts.

### **Environment Variables**

| Variable Name                          | Purpose                                               | Used In                 |
| -------------------------------------- | ----------------------------------------------------- | ----------------------- |
| `MONGO_DB_CONNECTION_STRING`           | MongoDB connection string                             | Database operations     |
| `CLOUDINARY_NAME`                      | Cloudinary cloud name                                 | Image uploads           |
| `CLOUDINARY_API_KEY`                   | Cloudinary API key                                    | Image uploads           |
| `CLOUDINARY_API_SECRET`                | Cloudinary API secret                                 | Image uploads           |
| `CLOUDINARY_DOCLIFY_BLOG_THUMB_FOLDER` | Folder name for storing blog thumbnails on Cloudinary | Image uploads           |
| `AUTH_GOOGLE_ID`                       | Google OAuth client identifier                        | Authentication flow     |
| `AUTH_GOOGLE_SECRET`                   | Google OAuth client secret                            | Authentication flow     |
| `AUTH_SECRET`                          | Secret for encrypting JWT/session tokens              | Auth configuration      |
| `AUTH_URL`                             | URL for authentication connection (protocol-based)    | Auth configuration      |
| `AUTH_TRUST_HOST`                      | Trusted host for Auth.js                              | Authentication security |
| `AUTHOR_LINK`                          | Author’s external profile link                        | Author info display     |

## 🧩 **Important Design Decisions**

- **Server Actions instead of API Routes** → less boilerplate, better type safety
- **React Cache (`cache()`)** → dedupe DB queries during SSR
- **Slug-based URLs** → cleaner, SEO-friendly blog links
- **Auto-generated usernames** from email using slugify
- **Flexible schema design** using Mongoose (good for tags & categories)

---
