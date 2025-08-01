# How Product Attributes are Handled

The system manages various product attributes through a combination of dedicated and unified APIs.

- **🏷️ Brands & 🗂️ Categories**: These are treated as separate entities and have their own dedicated **CRUD (Create, Read, Update, Delete) API endpoints**. This allows you to manage them independently and then associate them with products using their unique ID.

- **🎨 Color, 📏 Size, & ⚙️ Type**: These attributes are handled as direct properties within the product model. They are stored as simple text fields. A special endpoint (`GET /api/products/attributes`) is available to fetch all unique values for these fields.

- **\#️⃣ Tags**: Tags are managed as a flexible array of strings directly within the product model.

- **🔍 Filtering**: All these attributes are used for filtering via query parameters on the main product endpoint (`GET /api/products`). For example: `GET /api/products?brand=<brandId>&color=Red&tags=sale`.
