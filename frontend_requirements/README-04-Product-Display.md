# Frontend Task: Product Display & Filtering

## 1. Product Listing Page

- Create a main page (e.g., `/products`) to display all products.
- Fetch data from the `GET /api/products` endpoint.
- Create a reusable `ProductCard` component to display each product's image, name, price, and brand.

## 2. Single Product Page

- Create a dynamic route `products/[id]` to show details for a single product.
- Fetch data from the `GET /api/products/:id` endpoint.
- Display all product details, including description, stock, and attributes.

## 3. Implement Filtering UI

- On the product listing page, add UI elements for filtering:
  - **Dropdowns/Selects**: For `brand` and `category`. Fetch options from `GET /api/brands` and `GET /api/categories`.
  - **Checkboxes/Radios**: For `color`, `size`, and `type`. Fetch unique options from `GET /api/products/attributes`.
  - **Tag Input/Cloud**: For filtering by `tags`.
- When a filter is applied, re-fetch products from `GET /api/products` with the appropriate query parameters.
