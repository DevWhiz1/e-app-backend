const mongoose = require("mongoose");
const { Schema } = mongoose;

const customDesignSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    imagePath: { type: String, required: true },
    userPhoneNumber: { type: String, },
    email: { type: String, },
    designDescription: { type: String, },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",

    },
  },
  { timestamps: true }
);

const CustomDesign = mongoose.model("CustomDesign", customDesignSchema);

module.exports = CustomDesign;
