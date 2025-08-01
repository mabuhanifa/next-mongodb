# Vercel Deployment Guide

Follow these steps to deploy your Next.js application to Vercel and correctly configure it to avoid CORS and other common issues.

## Step 1: Push to GitHub

Ensure your project is pushed to a GitHub, GitLab, or Bitbucket repository.

## Step 2: Import Project on Vercel

1.  Log in to your Vercel account.
2.  Click "Add New..." -> "Project".
3.  Import the repository you just pushed. Vercel will automatically detect that it's a Next.js project.

## Step 3: Configure Environment Variables

This is the most critical step for a successful deployment. In your Vercel project settings, go to **Settings -> Environment Variables** and add the following:

| Variable Name         | Production Value                                             | Description                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MONGODB_URI`         | `mongodb+srv://<user>:<password>@cluster.mongodb.net/yourDB` | Your **production** MongoDB connection string.                                                                                                                    |
| `JWT_SECRET`          | `your_super_strong_random_production_secret`                 | A long, random, and secret string for signing JWTs. Do not use the local development key.                                                                         |
| `NEXT_PUBLIC_API_URL` | `/api`                                                       | On Vercel, all API routes are prefixed with `/api`. This ensures frontend requests are sent to the correct path (e.g., `/api/auth/login`).                        |
| `CORS_ORIGIN`         | `https://next-mongodb-brown.vercel.app`                      | **This is the key to avoiding CORS issues.** Set this to your main production URL provided by Vercel. You can add multiple URLs separated by a comma (no spaces). |

### Handling Preview Deployments

Vercel creates a unique URL for every push to a branch. To ensure your API works on these preview deployments, you should add a wildcard URL to your `CORS_ORIGIN` variable.

**Recommended `CORS_ORIGIN` value on Vercel:**

```
https://next-mongodb-brown.vercel.app,https://*-abuhanifa.vercel.app
```

- The first URL is your main production site.
- The second URL (`https://*-abuhanifa.vercel.app`) allows any preview deployment under your Vercel account/team (`abuhanifa`) to access the API.

## Step 4: Deploy

After configuring the environment variables, go to the "Deployments" tab and trigger a new deployment. Vercel will build and deploy your application.

By setting the `CORS_ORIGIN` correctly in the Vercel dashboard, your middleware will automatically handle all CORS headers for both production and preview environments.

## 🚨 Troubleshooting

### Error: `405 Method Not Allowed` on a path without `/api`

If your deployed application fails with a `405 Method Not Allowed` error and the browser console shows a request to a path like `https://.../auth/login` (missing the `/api` prefix), it means your `NEXT_PUBLIC_API_URL` is not configured correctly on Vercel.

**Solution:**

1.  Go to your project settings on Vercel.
2.  Navigate to **Settings -> Environment Variables**.
3.  Find the `NEXT_PUBLIC_API_URL` variable.
4.  Set its value to exactly `/api`. Do not include the full domain or any quotes.
5.  Go to the "Deployments" tab and **re-deploy your project** with the latest changes.

### Error: `CORS Missing Allow Origin` or `Network Error` on Deployed Site

If your deployed application at `https://next-mongodb-brown.vercel.app` fails with a "Network Error" and the browser console shows `Cross-Origin Request Blocked` for a URL pointing to `http://localhost:3000/api/...`, it means your frontend is trying to contact your local machine instead of its own backend.

This is caused by an incorrect `NEXT_PUBLIC_API_URL` environment variable on Vercel.

**Solution:**

1.  Go to your project settings on Vercel.
2.  Navigate to **Settings -> Environment Variables**.
3.  Find the `NEXT_PUBLIC_API_URL` variable.
4.  **Delete this variable entirely** or ensure its value is **completely blank**. Do not put quotes or any other text in it.
5.  Go to the "Deployments" tab and **re-deploy your project**. Make sure to select the option to "Redeploy" with the latest changes.

By **deleting** `NEXT_PUBLIC_API_URL` on Vercel, your frontend will correctly make API requests to relative paths (e.g., `/api/auth/login`), which resolves to `https://next-mongodb-brown.vercel.app/api/auth/login`. This is the correct behavior for a full-stack Next.js app on Vercel, as the frontend and backend are on the same origin.

### Error: `405 Method Not Allowed` and a broken URL

If you see an error in your browser console like `POST https://<your-domain>/"http:/localhost:3000/api"/auth/login` failed with status 405, this is also caused by a misconfigured `NEXT_PUBLIC_API_URL` (e.g., it contains quotes). The solution is the same: delete the variable on Vercel and redeploy.
