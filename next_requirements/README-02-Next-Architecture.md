# System Architecture (Next.js & Mongoose)

This project uses the Next.js App Router to create API endpoints, which promotes a scalable and maintainable serverless architecture suitable for Vercel.

```plaintext
next-inventory-management/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.js         # POST /api/auth/login
│   │   │   │   ├── register/route.js      # POST /api/auth/register
│   │   │   │   └── profile/route.js       # GET /api/auth/profile
│   │   │   │
│   │   │   ├── brands/
│   │   │   │   ├── [id]/route.js          # GET, PUT, DELETE /api/brands/:id
│   │   │   │   └── route.js               # GET, POST /api/brands
│   │   │   │
│   │   │   ├── categories/
│   │   │   │   ├── [id]/route.js
│   │   │   │   └── route.js
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── [id]/route.js
│   │   │   │   ├── attributes/route.js
│   │   │   │   └── route.js
│   │   │   │
│   │   │   ├── inventory/
│   │   │   │   ├── add/route.js
│   │   │   │   ├── low-stock/route.js
│   │   │   │   └── route.js
│   │   │   │
│   │   │   ├── sales/
│   │   │   │   ├── [id]/route.js
│   │   │   │   └── route.js
│   │   │   │
│   │   │   ├── customers/
│   │   │   │   ├── [id]/route.js
│   │   │   │   └── route.js
│   │   │   │
│   │   │   └── reports/
│   │   │       ├── summary/route.js
│   │   │       ├── sales/route.js
│   │   │       └── profit/route.js
│   │   │
│   │   ├── lib/                         # Shared logic, helpers, and config
│   │   │   ├── dbConnect.js             # Mongoose connection handler
│   │   │   ├── auth-helpers.js          # JWT and password functions
│   │   │   └── middleware.js            # Functions to simulate middleware
│   │   │
│   │   └── models/                      # Mongoose database schemas
│   │       ├── User.js
│   │       ├── Brand.js
│   │       ├── Category.js
│   │       ├── Product.js
│   │       ├── Sale.js
│   │       └── Customer.js
│   │
│   └── middleware.js                    # Next.js middleware for auth checks
│
├── .env.local                           # Environment variables
├── next.config.mjs                      # Next.js configuration
└── package.json
```
