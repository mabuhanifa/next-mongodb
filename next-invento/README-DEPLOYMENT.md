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

| Variable Name         | Production Value                                             | Description                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MONGODB_URI`         | `mongodb+srv://<user>:<password>@cluster.mongodb.net/yourDB` | Your **production** MongoDB connection string.                                                                                                                                |
| `JWT_SECRET`          | `your_super_strong_random_production_secret`                 | A long, random, and secret string for signing JWTs. Do not use the local development key.                                                                                     |
| `NEXT_PUBLIC_API_URL` | (Leave this blank)                                           | On Vercel, your API is on the same domain. The frontend should make requests to relative paths like `/api/auth/login`. Leaving this blank will make Axios use relative paths. |
| `CORS_ORIGIN`         | `https://your-project-name.vercel.app`                       | **This is the key to avoiding CORS issues.** Set this to your main production URL provided by Vercel. You can add multiple URLs separated by a comma (no spaces).             |

### Handling Preview Deployments

Vercel creates a unique URL for every push to a branch. To ensure your API works on these preview deployments, you should add a wildcard URL to your `CORS_ORIGIN` variable.

**Recommended `CORS_ORIGIN` value on Vercel:**

```
https://your-project-name.vercel.app,https://*-your-team-scope.vercel.app
```

- Replace `your-project-name` with your Vercel project's name.
- Replace `your-team-scope` with your Vercel username or team name (e.g., `https://*-abuhanifa.vercel.app`).

This allows your main domain AND all preview domains to make requests to the API.

## Step 4: Deploy

After configuring the environment variables, go to the "Deployments" tab and trigger a new deployment. Vercel will build and deploy your application.

By setting the `CORS_ORIGIN` correctly in the Vercel dashboard, your middleware will automatically handle all CORS headers for both production and preview environments.
