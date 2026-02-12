# Smart Bookmark App

A simple bookmark manager built as part of an assignment using Next.js and Supabase.

Users can sign in with Google, save bookmarks, and manage them securely.
The main focus of this project is authentication, data privacy, and a smooth real-time user experience.

---

## 🔗 Live Demo

Live URL:  
https://bookmark-manager-nzgs-cpaidt7gb-rahmath-42627s-projects.vercel.app

GitHub Repository:  
https://github.com/Rahmath-42627/bookmark-manager

The app can be tested using any Google account.

---

## ✨ Features

- Google OAuth authentication (no email/password)
- Add bookmarks with title and URL
- Delete your own bookmarks
- Bookmarks are private to each user
- Instant updates across multiple browser tabs
- Clean and simple UI using Tailwind CSS

---

## 🛠 Tech Stack

- Next.js (App Router)
- Supabase (Authentication, Database, RLS)
- Tailwind CSS
- Vercel (Deployment)

---

## 🔐 Authentication

Authentication is handled using **Supabase Google OAuth**.
There is no traditional email/password login.

Once logged in, the authenticated user session is used to associate bookmarks with the correct user.

---

## 🔒 Data Privacy & Security

- Each bookmark is stored with the logged-in user’s ID.
- Supabase **Row Level Security (RLS)** policies ensure that:
  - Users can only read their own bookmarks
  - Users can only delete bookmarks they created

This prevents unauthorized access to other users’ data.

---

## ⚡ Real-Time Updates Across Tabs

The requirement was to update bookmarks in real time when the app is opened in multiple tabs.

To achieve this, the app uses the browser’s **BroadcastChannel API**.

When a bookmark is added or deleted in one tab:
- An event is broadcast to other open tabs
- Other tabs update their bookmark list immediately
- No page refresh is required

This approach is stable and efficient for same-user, same-browser scenarios.

---

## 🧠 Problems Faced & Solutions

### Cross-tab synchronization
Handling real-time updates across multiple tabs was initially challenging.
After testing different approaches, **BroadcastChannel** proved to be the simplest and most reliable solution for this use case.

### Client vs Server behavior in Next.js
Since the Next.js App Router uses server components by default, browser-only APIs caused issues initially.
This was resolved by clearly separating client components using `"use client"` and isolating browser-specific logic.

### UI improvements
The initial UI was very basic.
It was improved by adding better spacing, focus states, and hover effects using Tailwind CSS to enhance usability.

---

## ✅ Final Notes

This project focuses on:
- Clean architecture
- Secure user data handling
- Real-time user experience
- Production-ready deployment
