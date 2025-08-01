# Frontend Task: Dashboard & Reports (Admin)

## 1. Main Dashboard Page

- Create an admin-only dashboard page (`/admin/dashboard`).
- Fetch data from the `GET /api/reports/summary` endpoint.
- Display the summary data (total products, total customers, total revenue) in clear, easy-to-read "stat cards".

## 2. Sales Report View

- Create a section or page for sales reports.
- Fetch data from `GET /api/reports/sales`.
- Include date range pickers to filter the report (`startDate`, `endDate`).
- Display the results (total revenue, units sold, number of sales).
- **Bonus**: Use a charting library (e.g., `recharts`) to visualize sales data over time.

## 3. Profit Report View

- Create a section or page for profit reports.
- Fetch data from `GET /api/reports/profit`.
- Include date range pickers for filtering.
- Display the results (total revenue, total cost, total profit).
- **Bonus**: Use a bar or line chart to compare revenue, cost, and profit.
