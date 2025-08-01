const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

// Import Mongoose models
const User = require("../app/models/User").default;
const Brand = require("../app/models/Brand").default;
const Category = require("../app/models/Category").default;
const Product = require("../app/models/Product").default;
const Customer = require("../app/models/Customer").default;
const Sale = require("../app/models/Sale").default;

// Import data
const usersData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "users.json"), "utf-8")
);
const brandsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "brands.json"), "utf-8")
);
const categoriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "categories.json"), "utf-8")
);
const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf-8")
);
const customersData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "customers.json"), "utf-8")
);
const salesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "sales.json"), "utf-8")
);

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(process.env.MONGODB_URI);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const seedDatabase = async () => {
  try {
    await dbConnect();
    console.log("Database connected.");

    console.log("Clearing existing data...");
    await Sale.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Customer.deleteMany({});
    await User.deleteMany({});
    console.log("Data cleared.");

    // Seed Users
    console.log("Seeding users...");
    const usersToCreate = await Promise.all(
      usersData.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      }))
    );
    await User.insertMany(usersToCreate);
    console.log("Users seeded.");

    // Seed Brands and Categories
    console.log("Seeding brands and categories...");
    const createdBrands = await Brand.insertMany(brandsData);
    const createdCategories = await Category.insertMany(categoriesData);
    console.log("Brands and categories seeded.");

    // Seed Products
    console.log("Seeding products...");
    const productsToCreate = productsData.map((p) => {
      const brand = createdBrands.find((b) => b.name === p.brandName);
      const category = createdCategories.find((c) => c.name === p.categoryName);
      return { ...p, brand: brand._id, category: category._id };
    });
    const createdProducts = await Product.insertMany(productsToCreate);
    console.log("Products seeded.");

    // Seed Customers
    console.log("Seeding customers...");
    const createdCustomers = await Customer.insertMany(customersData);
    console.log("Customers seeded.");

    // Seed Sales and update stock
    console.log("Seeding sales and updating stock...");
    for (const sale of salesData) {
      const product = createdProducts.find((p) => p.name === sale.productName);
      const customer = createdCustomers.find(
        (c) => c.email === sale.customerEmail
      );

      if (!product) {
        console.warn(`Product not found for sale: ${sale.productName}`);
        continue;
      }

      const saleToCreate = {
        product: product._id,
        customer: customer ? customer._id : null,
        quantity: sale.quantity,
        totalPrice: product.price * sale.quantity,
        totalCost: product.cost * sale.quantity,
      };
      await Sale.create(saleToCreate);

      // Update product stock
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -sale.quantity },
      });
    }
    console.log("Sales seeded and stock updated.");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedDatabase();
