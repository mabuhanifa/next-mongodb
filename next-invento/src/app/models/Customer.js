import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a customer name."],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
