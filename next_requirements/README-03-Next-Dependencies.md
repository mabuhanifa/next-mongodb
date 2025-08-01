# Required Packages

### Core

- **next**: The core Next.js framework for React and API routes.
- **react**, **react-dom**: Required peer dependencies for Next.js.
- **mongoose**: The ODM for interacting with the MongoDB database.

### Authentication & Authorization

- **bcryptjs**: Hashes user passwords.
- **jsonwebtoken**: Creates and verifies JSON Web Tokens (JWT).

### Utilities & Services

- **date-fns**: Simplifies working with dates and times.
- **nodemailer**: For sending emails (e.g., low-stock alerts).
- **node-cron**: For running scheduled tasks (Note: Vercel's free tier requires using "Vercel Cron Jobs" instead of node-cron for scheduled tasks).

### Development

- **eslint** & **prettier**: For code linting and formatting (included with `create-next-app`).
