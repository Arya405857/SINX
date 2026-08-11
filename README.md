# Signix AI

Signix AI is a React/Vite workspace with an Express and MongoDB API. The frontend structure and routes are preserved; the backend provides authentication, user data, translation history, learning progress, settings, profile uploads, and an AI-ready adapter boundary.

## Run locally

1. Install MongoDB locally or set up a MongoDB Atlas connection.
2. Copy `backend/.env.example` to `backend/.env`, set `MONGODB_URI`, and replace both JWT secrets with long random values.
3. Run `npm install` in both `frontend` and `backend`.
4. Start the API with `npm run dev` from `backend`.
5. Start the site with `npm run dev` from `frontend`.

The Vite development server proxies `/api` and `/uploads` to `http://localhost:5000`. For deployed frontends, set `VITE_API_URL` to the public API URL and `CLIENT_URL` to the public frontend origin.

## Main API

All successful responses use `{ success: true, data }`; errors use `{ success: false, error }`. Protected routes require `Authorization: Bearer <accessToken>`.

| Area | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/register`, `verify-otp`, `resend-otp`, `login`, `forgot-password`, `reset-password`, `refresh`, `logout` |
| Workspace | `GET /api/dashboard`, `GET /api/translator/meta`, `POST /api/translator/translate`, `POST /api/signa/messages` |
| History | `GET /api/history`, `GET /api/history/export`, `DELETE /api/history/:id` |
| Account | `GET/PATCH /api/profile`, `POST /api/profile/avatar`, `GET/PATCH /api/settings` |
| Learning | `GET /api/learning`, `PATCH /api/learning/lessons/:lessonId` |

## Security and production notes

The API uses Helmet, CORS allowlisting, compression, request logging, rate limiting, request validation, hashed passwords, expiring OTPs, short-lived access JWTs, refresh-token persistence/revocation, and HTTP-only refresh cookies. Configure SMTP to send OTPs; development mode logs the OTP locally. Uploads accept images up to 10 MB; move `UploadedMedia` storage to object storage before multi-instance deployment.

The AI endpoints deliberately persist requests and return an explicit pending state through `services/aiService.js`. Connect a FastAPI/ML/LLM provider there without changing controllers or frontend contracts.

## Verification

`npm run build` in `frontend` and syntax checks for all backend source files complete successfully. A running MongoDB instance plus configured environment is required to exercise live API flows.
