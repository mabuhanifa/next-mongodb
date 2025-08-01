# Frontend Task: Customer Management

## 1. Customer List Page

- Create a page (`/customers` or `/admin/customers`) to display all customers in a table.
- Fetch data from `GET /api/customers`.
- Display columns for name, email, and phone.

## 2. Create Customer Form

- Build a form to add a new customer (`POST /api/customers`).
- Include fields for `name`, `email`, and `phone`.

## 3. Edit Customer Form (Admin)

- Create an admin-only feature to edit customer details.
- This can be a separate page (`/admin/customers/edit/[id]`) or a modal.
- Pre-populate the form with data from `GET /api/customers/:id`.
- On submission, send a `PUT` request to `/api/customers/:id`.

## 4. Delete Customer (Admin)

- Add a "Delete" button for each customer in the list for admins.
- Include a confirmation step before sending the `DELETE` request to `/api/customers/:id`.
