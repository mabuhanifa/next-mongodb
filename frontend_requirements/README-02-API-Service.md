# Frontend Task: API Service Layer

## 1. Create a Central Axios Instance

- In `services/api.js`, create a configured instance of Axios.
- Set the `baseURL` to the `NEXT_PUBLIC_API_URL` from your environment variables.
- Configure it to send cookies with every request using `withCredentials: true`. This is essential for the JWT authentication to work.

```javascript
// Example: services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default api;
```

## 2. Define API Functions by Resource

- Create separate files in the `services/` directory for each API resource (e.g., `authApi.js`, `productApi.js`, `brandApi.js`).
- These files will import the central `api` instance and export functions for each specific endpoint.

```javascript
// Example: services/authApi.js
import api from "./api";

export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const getUserProfile = () => api.get("/auth/profile");
```

## 3. Handle Errors Globally

- Implement a global error handler for the Axios instance in `services/api.js` to gracefully manage API errors (e.g., 401 Unauthorized, 403 Forbidden, 500 Server Error).
