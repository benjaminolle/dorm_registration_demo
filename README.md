# Dorm Registration System

A full-stack web app for managing student dormitory registrations across multiple projects. Built for a boarding house in a school.

## Features

- **User Authentication**
- **Multi-user, multi-project** - each user manages independent registration projects, fully data-scoped
- **Student registrations**
- **Auto dorm assignment**
- **Live vacancy tracking**
- **Project management** - create, view with their own dorms and students
- **CSV export** - full student data export per project
- **User profile updates**
- **Demo mode** - demo accounts auto-deleted after 2 days via a scheduled cleanup job

## Tech Stack

| **Layer** | **Technology** |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL via Neon (pooled) |
| **Auth** | NextAuth/Auth.js (Credentials) |
| **Password Hashing** | bcrypt |

## Getting Started

**Prerequisites:** Node.js 18+, a Postgres database, Vercel account (optional).

Create `.env.local`:

```
DATABASE_URL="your-db-connection"
AUTH_SECRET="your-secret-here"
CRON_SECRET="your-cron-secret-here"   # optional, demo cleanup

```

Generate the auth secret: `npx auth secret`
