# Frontend Task: UI/UX and State Management

## 1. Global State with Context API

- **Authentication Context**: Create an `AuthContext` to manage the global user state.

  - **`context/AuthContext.js`**: This file will define the context and the provider component. The provider will manage the state (`user`, `isAuthenticated`) and expose functions (`login`, `logout`, `register`).
  - **Custom Hook**: Create a `useAuth` custom hook to provide easy access to the `AuthContext` from any component.
  - **Layout Integration**: Wrap your root layout in `app/layout.js` with the `AuthProvider` to make the state available throughout the application.

- **Data Caching**: For data that is needed across many components and doesn't change often (like brands and categories), you can create a separate context (e.g., `DataContext`) to fetch and provide this data, preventing redundant API calls.

## 2. UI/UX Considerations

- **Notifications**: Use a toast library (e.g., `react-hot-toast`) to give users feedback on actions (e.g., "Product created successfully," "Error logging in").
- **Loading States**: Implement loading spinners or skeletons on pages and components while data is being fetched from the API.
- **Form Validation**: Implement client-side form validation to provide immediate feedback. Libraries like `react-hook-form` are excellent for managing form state and validation.
- **Responsive Design**: Ensure the application is usable on all screen sizes, from mobile to desktop, using Tailwind CSS's responsive utilities.
