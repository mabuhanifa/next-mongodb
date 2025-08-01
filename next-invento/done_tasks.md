# Backend API Summary: Inventory Management System

This document summarizes the completed backend features and API endpoints. Use this as a guide for building the frontend application.

---

## ✨ Core Features Implemented

- **Full User Authentication**: JWT-based registration, login, and profile management.
- **Role-Based Access Control**: Endpoints for creating, updating, and deleting data are restricted to users with an `admin` role.
- **Complete CRUD Operations**: Full support for Products, Brands, Categories, and Customers.
- **Transactional Sales & Inventory**: Recording a sale automatically decrements the corresponding product's stock in a single, safe transaction.
- **Dynamic Filtering**: The main products endpoint supports filtering by various attributes.
- **Comprehensive Reporting**: Endpoints to generate reports on sales, profit, and overall business summaries.

---

## 🚀 API Endpoints

All endpoints are protected and require an authenticated user, except for `/login` and `/register`. Endpoints marked with `(Admin only)` require the user to have the `admin` role.

### Authentication (`/api/auth`)

- `POST /register`: Register a new user.
  - **Body**: `{ "name": "...", "email": "...", "password": "..." }`
- `POST /login`: Log in a user. Sets an HTTP-only `token` cookie on success.
  - **Body**: `{ "email": "...", "password": "..." }`
- `GET /profile`: Get the current authenticated user's profile.

### Products (`/api/products`)

- `GET /`: Get all products.
  - **Query Params (for filtering)**: `?brand=<id>&category=<id>&color=Red&size=M&type=Shirt&tags=sale,new`
- `POST /`: Create a new product. `(Admin only)`
- `GET /:id`: Get a single product by its ID.
- `PUT /:id`: Update a product. `(Admin only)`
- `DELETE /:id`: Delete a product. `(Admin only)`
- `GET /attributes`: Get all unique values for `colors`, `sizes`, and `types` for use in frontend filters.

### Brands (`/api/brands`)

- `GET /`: Get all brands.
- `POST /`: Create a new brand. `(Admin only)`
- `GET /:id`: Get a single brand.
- `PUT /:id`: Update a brand. `(Admin only)`
- `DELETE /:id`: Delete a brand. `(Admin only)`

### Categories (`/api/categories`)

- `GET /`: Get all categories.
- `POST /`: Create a new category. `(Admin only)`
- `GET /:id`: Get a single category.
- `PUT /:id`: Update a category. `(Admin only)`
- `DELETE /:id`: Delete a category. `(Admin only)`

### Inventory (`/api/inventory`)

- `GET /`: Get current stock levels for all products.
- `POST /add`: Add stock for a product. `(Admin only)`
  - **Body**: `{ "productId": "...", "quantity": ... }`
- `GET /low-stock`: Get products with low stock.
  - **Query Params**: `?threshold=5` (defaults to 10 if not provided).

### Sales (`/api/sales`)

- `GET /`: Get all sales records.
- `POST /`: Create a new sale. This automatically decrements product stock.
  - **Body**: `{ "productId": "...", "quantity": ..., "customerId": "..." }` (`customerId` is optional).
- `GET /:id`: Get a single sale record.

### Customers (`/api/customers`)

- `GET /`: Get all customers.
- `POST /`: Create a new customer.
- `GET /:id`: Get a single customer.
- `PUT /:id`: Update a customer. `(Admin only)`
- `DELETE /:id`: Delete a customer. `(Admin only)`

### Reports (`/api/reports`)

- `GET /summary`: Get a high-level summary (total products, customers, revenue, etc.). `(Admin only)`
- `GET /sales`: Get a sales report. `(Admin only)`
  - **Query Params**: `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `GET /profit`: Get a profit report (revenue, cost, profit). `(Admin only)`
  - **Query Params**: `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

---

## 🔧 Setup Notes

- The project requires a `.env.local` file in the root with the following variables:
  - `MONGODB_URI`: Your MongoDB connection string.
  - `JWT_SECRET`: A secret key for signing JSON Web Tokens.
- Path aliases (`@/*`) are configured in `jsconfig.json` to point to the `src/` directory.
