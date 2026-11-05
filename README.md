# Kindora – Community Events Platform

**Discover Events. Connect with People. Make a Difference.**

Kindora is a full-stack community events platform that makes it easy for people to discover upcoming events, participate in community activities, and organize events of their own.

Users can explore upcoming and previous events, view detailed event information, join events, and manage the events they create. The platform supports secure authentication through email/password and Google sign-in.

## 🌐 Live Demo

| Resource | Link |
|---|---|
| **Frontend** | [Kindora Live](https://kindora-client-ten.vercel.app/) |
| **Backend API** | [Kindora Server](https://kindora-server-roan.vercel.app/) |
| **Frontend Repository** | [Kindora Client – GitHub](https://github.com/Wasima230Sultana/Kindora_client) |
| **Backend Repository** | [Kindora Server – GitHub](https://github.com/Wasima230Sultana/Kindora_server) |

## ✨ Key Features

- **Event Discovery:** Browse upcoming and previous community events.
- **Event Details:** Explore detailed information about individual events.
- **Join Events:** Participate in events organized by other users.
- **Event Management:** Create, edit, and delete your own events.
- **Joined Events:** View and manage events you have joined.
- **Secure Authentication:** Sign in and register using email/password or Google.
- **User Profile:** Access and manage your personal profile.
- **Dark/Light Mode:** Switch between themes for a comfortable browsing experience.
- **Responsive Design:** Enjoy a consistent experience across different screen sizes.

## 🛠️ Technology Stack

### Frontend

- **Framework:** Next.js 16.4.3 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Base UI primitives)
- **Authentication:** better-auth
- **Theme Management:** next-themes

### Backend & Database

- **Backend:** Separate REST API
- **Authentication:** better-auth
- **Database:** MongoDB Atlas
- **Authentication Methods:** Email/Password and Google OAuth

## 📁 Project Structure

```text
Kindora_client/
├── app/
│   ├── api/                 # Authentication API routes
│   ├── login/               # Login page
│   ├── signup/              # Registration page
│   ├── upcoming-events/     # Event listing and details
│   ├── create-event/        # Event creation
│   ├── manage-event/        # Manage created events
│   ├── joined-event/        # Joined events
│   ├── profile/             # User profile
│   ├── layout.tsx
│   └── page.tsx             # Landing page
│
├── components/
│   ├── home/                # Homepage components
│   ├── events/              # Event-related components
│   ├── ui/                  # Reusable UI components
│   ├── Card/
│   └── theme/               # Theme components
│
├── lib/
│   ├── auth.ts              # Authentication configuration
│   ├── auth-client.ts       # Client-side authentication
│   ├── data.ts              # Homepage mock data
│   └── utils.ts             # Utility functions
│
├── public/                  # Static assets
├── package.json
└── README.md
```

## 🚀 Getting Started

Follow these steps to run the frontend locally.

### Prerequisites

Make sure you have installed:

- Node.js 24.x
- npm
- MongoDB Atlas account
- Google OAuth credentials
- A running Kindora backend API

### 1. Clone the Repository

```bash
git clone https://github.com/Wasima230Sultana/Kindora_client.git

cd Kindora_client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

MONGODB_URL=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_better_auth_secret

BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Environment Variable Description**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Kindora backend API |
| `MONGODB_URL` | MongoDB Atlas connection string |
| `BETTER_AUTH_SECRET` | Secret used for signing authentication sessions |
| `BETTER_AUTH_URL` | Base URL of the frontend application |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

**Note:** The authentication database name is configured as `kindora_resources` in `lib/auth.ts`.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Make sure the backend API is running before testing event-related functionality.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server and updates the managed agent-rules block in `AGENTS.md` |
| `npm run build` | Creates a production build |
| `npm start` | Starts the production server |
| `npm run lint` | Runs ESLint |
| `npm run typecheck` | Runs TypeScript type checking |
| `npm run format` | Formats TypeScript and TSX files using Prettier |

## 📌 Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Landing page with featured events, banner, and gallery | Public |
| `/upcoming-events` | Browse upcoming events | Public |
| `/upcoming-events/:id` | View event details | Public |
| `/create-event` | Create a new event | Authenticated |
| `/manage-event` | Edit and delete created events | Authenticated |
| `/joined-event` | View joined events | Authenticated |
| `/wishlist` | Waitlist for events: join when Available, queue when Occupied, first waiter gets the spot on cancellation | Authenticated |
| `/profile` | View user profile | Authenticated |
| `/login` | Sign in to Kindora | Public |
| `/signup` | Create a new account | Public |

## 🔗 Backend API Integration

Kindora uses a separate REST API for event-related operations.

The backend URL is configured through `NEXT_PUBLIC_API_URL`.

| Method | Endpoint | Functionality |
|---|---|---|
| GET | `/upcoming-events` | Retrieve upcoming events |
| GET | `/upcoming-events/:id` | Retrieve a specific event |
| POST | `/create-event` | Create an event |
| PATCH | `/manage-event/:id` | Update an event |
| DELETE | `/upcoming-events/:id` | Delete an event |
| GET | `/manage-event/:email` | Retrieve events created by a user |
| GET | `/joined-event/:email` | Retrieve events joined by a user |
| POST | `/joined-event` | Join an event |
| DELETE | `/joined-event/:id` | Cancel an event registration |

**Authentication:** Protected API requests include a Bearer token obtained through `lib/getTokenFromClient.ts`.

## ⚠️ Important Notes

- **Backend Dependency:** The backend API must be available for event-related data and operations to work correctly.
- **Authentication:** better-auth uses MongoDB Atlas for session and user management.
- **Homepage Content:** Some homepage sections, including the banner and gallery, currently use mock data from `lib/data.ts`.
- **Route Protection:** The intended `proxy.ts` route guard is currently located inside the `app/` directory. Next.js 16 expects this file at the project root. Move it to the root directory to activate the intended server-side route protection.
- **Linting:** The project currently has pre-existing ESLint errors that may cause `npm run lint` to exit with a non-zero status.
- **Testing:** No automated test runner or CI workflow is currently configured.

## 👩‍💻 Developer

**Wasima Sultana**

- GitHub: [Wasima230Sultana](https://github.com/Wasima230Sultana)

---

**Kindora – Bringing Communities Together Through Events.**