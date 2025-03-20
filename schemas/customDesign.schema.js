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
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        },
        color: {
          type: String,
          default: null
        },
        size: {
          type: String,
          default: null
        },
        quality: {
          type: String,
          default: null
        },
        customDesignPath:{
          type: String,
        },
        customDesignDescription:{
          type: String,
        },
      },
    ],
    userPhoneNumber: { type: String, },
    email: { type: String, },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",

    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CustomDesign = mongoose.model("CustomDesign", customDesignSchema);

module.exports = CustomDesign;
