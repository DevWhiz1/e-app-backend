const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productImage:{
          type: String,
          required: true,
        },
        price:{
          type: Number,
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
        description: {
          type: String,
        
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;