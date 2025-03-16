const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: [{ type: String }],
    quality: [{ type: String }],
    size: [{ type: String }],
    image: String,
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
