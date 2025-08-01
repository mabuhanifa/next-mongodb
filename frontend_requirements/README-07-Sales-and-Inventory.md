# Frontend Task: Sales & Inventory (Admin)

## 1. Create Sale Form

- Build an admin-facing form to log a new sale (`POST /api/sales`).
- The form should include:
  - A searchable dropdown to select a `product` (populated from `GET /api/products`).
  - A number input for `quantity`.
  - An optional dropdown to select a `customer` (populated from `GET /api/customers`).
- On submission, the form should handle success and error states (e.g., "Insufficient stock").

## 2. View Sales History

- Create a page to display all sales records from `GET /api/sales`.
- Show details like product name, quantity, total price, customer, and date for each sale.

## 3. Inventory Management UI

- Create an admin page (`/admin/inventory`) to manage stock.
- **View Stock**: Display all products and their current stock levels from `GET /api/inventory`.
- **Add Stock**: For each product, provide a simple form/input to add stock (`POST /api/inventory/add`).
- **Low Stock Alerts**: Display a prominent list or notification area for products fetched from `GET /api/inventory/low-stock`.
