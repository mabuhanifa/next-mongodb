# Frontend Task: Product Management (Admin)

## 1. Product Management Dashboard

- Create an admin-only page (e.g., `/admin/products`) that displays all products in a table.
- The table should include columns for name, stock, price, and actions (Edit, Delete).

## 2. Create Product Form

- Build a form for creating a new product (`POST /api/products`).
- The form should include fields for all product properties:
  - `name`, `description`, `price`, `cost`, `stock`.
  - A dropdown for `brand` (populated from `GET /api/brands`).
  - A dropdown for `category` (populated from `GET /api/categories`).
  - Input fields for `attributes` (color, size, type).
  - A text input for `tags` (e.g., comma-separated).

## 3. Edit Product Form

- Create a dynamic route (e.g., `/admin/products/edit/[id]`) for updating a product.
- Pre-populate the form with data from `GET /api/products/:id`.
- On submission, send a `PUT` request to `/api/products/:id`.

## 4. Delete Product Functionality

- Implement a "Delete" button for each product in the management table.
- On click, show a confirmation modal.
- If confirmed, send a `DELETE` request to `/api/products/:id` and update the UI.
