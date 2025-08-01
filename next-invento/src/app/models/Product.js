import mongoose from "mongoose";

// Define a separate schema for the nested attributes.
// Using { _id: false } prevents Mongoose from creating an _id for the sub-document.
const AttributeSchema = new mongoose.Schema(
  {
    size: String,
    color: String,
    type: String,
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name."],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price."],
    },
    cost: {
      type: Number,
      required: [true, "Please provide a cost."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    // Use the AttributeSchema for the attributes field.
    attributes: AttributeSchema,
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
