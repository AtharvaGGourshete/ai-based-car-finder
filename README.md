# Vehiql - AI Based Car Finder

Vehiql is a full-stack car marketplace built with Next.js. It helps users discover cars using traditional filters and AI image-based search, save favorites, and schedule test drives. It also includes an admin panel for managing inventory, bookings, dealership settings, and user roles.

## Objectives

- Lets users browse available cars with filters (make, body type, fuel type, transmission, price range, sort, pagination).
- Supports AI-assisted image search from the home page (uploads a car image and extracts likely make/body type/color).
- Allows authenticated users to save/unsave cars and manage their reservations.
- Lets users book test drives with dealership working-hours based slot availability.
- Provides admins with a dashboard, car management, booking status management, and dealership/user settings.

## Core Features

- Authentication and route protection via Clerk.
- Role-based admin area (`USER` / `ADMIN`) with server-side authorization checks.
- Car inventory and booking persistence using Prisma + PostgreSQL.
- Car image storage using Supabase Storage (`car-images` bucket).
- Rate-limiting and bot/shield protection with Arcjet.
- Server Actions for data operations (listing, booking, admin updates).

## Local Setup

### 1. Prerequisites

- Node.js 20+
- npm
- PostgreSQL database
- Clerk project
- Supabase project
- Arcjet key
- Groq API key

### 2. Clone the project and install dependencies

```bash
git clone https://github.com/AtharvaGGourshete/ai-based-car-finder.git
cd ai-based-car-finder
```

```bash
npm install
```

### 3. Run database migrations

```bash
npx prisma migrate dev
```

Optional (inspect DB):

```bash
npx prisma studio
```

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## First-Run Checklist

1. Sign up through Clerk from the app.
2. Your user row is auto-created in the database on first authenticated visit.
3. If you need admin access, promote your user in Postgres:

```sql
UPDATE "User"
SET "role" = 'ADMIN'
WHERE "email" = 'your-email@example.com';
```

4. Visit `/admin` after promotion.

## Available Scripts

- `npm run dev` - start local dev server with Turbopack.
- `npm run build` - create production build.
- `npm run start` - run production build.
- `npm run lint` - run ESLint.

## Project Structure (High Level)

- `app/` - Next.js App Router pages and layouts.
- `actions/` - Server Actions for cars, bookings, admin, settings, home search.
- `components/` - Reusable UI components.
- `lib/` - Prisma client, auth/user helpers, Arcjet and Supabase setup.
- `prisma/` - Prisma schema and migration files.

