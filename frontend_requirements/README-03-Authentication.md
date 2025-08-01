# Frontend Task: Authentication Flow

## 1. Create Authentication Pages

- Build the UI for the following pages:
  - `/login`: A form with email and password fields.
  - `/register`: A form with name, email, and password fields.

## 2. Implement User State Management

- Use the **React Context API** to create an `AuthContext` for managing user information and authentication status (`isAuthenticated`, `user`, `isAdmin`).
- Create a custom hook, `useAuth()`, to easily access the context's state and functions.
- When a user successfully logs in, fetch their profile using the `/api/auth/profile` endpoint and update the `AuthContext` state.

## 3. Create Protected Routes

- Implement a higher-order component (HOC) or a layout component that checks the user's authentication status.
- If a user is not authenticated, redirect them to the `/login` page.
- Create admin-only routes that check if `user.role === 'admin'`. If not, redirect or show an "Access Denied" message.

## 4. Implement Logout

- Create a logout button that calls the `logout` function from the `useAuth` hook.
- A backend endpoint at `POST /api/auth/logout` has been created to clear the HTTP-only `token` cookie.
