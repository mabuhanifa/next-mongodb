# Frontend Task: Project Setup

## 1. Initialize Frontend Project

- Use `create-next-app` to scaffold a new Next.js application for the frontend.
- Choose to use **JavaScript**, **Tailwind CSS**, and the **App Router**.

## 2. Install Dependencies

- Install `axios` for making HTTP requests to the backend API.

## 3. Configure Environment Variables

- Create a `.env.local` file in the root of the frontend project.
- Add the backend API URL to this file:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3000/api
  ```

## 4. Folder Structure

- Organize the project with logical folders, such as:
  - `components/`: For reusable UI components.
  - `services/`: For the API service layer and other helper functions.
  - `context/`: For React Context providers and custom hooks.
  - `app/`: For pages and layouts using the App Router.
  - `store/` or `context/`: For global state management.
  - `app/`: For pages and layouts using the App Router.
