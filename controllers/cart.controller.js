const Cart=require("../schemas/cart.schema")

let cartController = {};

cartController.createUserCart = async (req, res) => {
  try {
    const { products, userId, supplierId, totalAmount } = req.body;
    
    if (!products || !userId || !supplierId || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Validate products array structure
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products must be a non-empty array" });
    }
    
    // Check if each product has the required fields
    for (const product of products) {
      if (!product.productId || !product.quantity || !product.price) {
        return res.status(400).json({ 
          message: "Each product must have productId, quantity, and price" 
        });
      }
    }
    
    const newCart = new Cart({
      products,
      userId,
      supplierId,
      totalAmount,
    });
    
    const savedCart = await newCart.save();
    
    res.status(201).json({ message: "Cart saved successfully", cart: savedCart });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


cartController.getCartByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const carts = await Cart.find({ userId })

    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: "No cart found for this user" });
    }

    res.status(200).json({ message: "Cart retrieved successfully", carts });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = cartController;