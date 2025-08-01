# Frontend Task: Brand & Category Management (Admin)

## 1. Management Page

- Create an admin-only page (e.g., `/admin/attributes`) to manage brands and categories.
- Use a tabbed interface to switch between "Brands" and "Categories".

## 2. Brand CRUD UI

- **Display**: Fetch all brands from `GET /api/brands` and display them in a list or table.
- **Create**: Add a simple form with a single text input to create a new brand (`POST /api/brands`).
- **Update**: Add an "Edit" button for each brand, allowing the name to be updated in-place or in a modal (`PUT /api/brands/:id`).
- **Delete**: Add a "Delete" button with a confirmation step (`DELETE /api/brands/:id`).

## 3. Category CRUD UI

- **Display**: Fetch all categories from `GET /api/categories` and display them.
- **Create**: Add a form to create a new category (`POST /api/categories`).
- **Update**: Implement an "Edit" feature (`PUT /api/categories/:id`).
- **Delete**: Implement a "Delete" feature with confirmation (`DELETE /api/categories/:id`).
