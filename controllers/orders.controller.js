const { default: mongoose } = require("mongoose");
const Order = require("../schemas/orders.schema");
const User = require("../schemas/users.schema");

const orderController = {};

// Create Order
orderController.createOrder = async (req, res) => {
  try {
    const { userId, supplierId, cartId, totalAmount, } = req.body;

    if (!userId || !supplierId || !cartId || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      userId,
      supplierId,
      cartId,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

orderController.getOrdersBySupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    
    const orders = await Order.find({
      supplierId: new mongoose.Types.ObjectId(supplierId),
      orderStatus: 'Processing'
    });
    
    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders found for this supplier", orders: [] });
    }
    
    const userIds = [...new Set(orders.map(order => order.userId))];
    
    const users = await User.find({ 
      _id: { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) }
    });
    
    const userMap = {};
    users.forEach(user => {
      userMap[user._id.toString()] = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      };
    });
    
    const ordersWithUserInfo = orders.map(order => {
      const orderObj = order.toObject();
      orderObj.userInfo = userMap[order.userId.toString()] || null;
      return orderObj;
    });
    
    res.status(200).json({ 
      message: "Orders retrieved successfully", 
      orders: ordersWithUserInfo 
    });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


orderController.getOrderByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(userId),
      orderStatus: 'Processing'
    });
    
    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders found for this supplier", orders: [] });
    }
    
    const userIds = [...new Set(orders.map(order => order.userId))];
    
    const users = await User.find({ 
      _id: { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) }
    });
    
    const userMap = {};
    users.forEach(user => {
      userMap[user._id.toString()] = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      };
    });
    
    const ordersWithUserInfo = orders.map(order => {
      const orderObj = order.toObject();
      orderObj.userInfo = userMap[order.userId.toString()] || null;
      return orderObj;
    });
    
    res.status(200).json({ 
      message: "Orders retrieved successfully", 
      orders: ordersWithUserInfo 
    });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

  orderController.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({})
      if (!orders || orders.length === 0) {
        return res.status(200).json({ message: "No orders found", orders: [] });
      }

      res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  orderController.updateStatus = async(req, res) => {
    const { orderStatus }  = req.body;
    const id  = req.params.id;
    console.log(id);
    console.log(orderStatus)
    if (!["Delivered", "Rejected"].includes(orderStatus)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
     { _id: new mongoose.Types.ObjectId(id) },
       { orderStatus }, 
       { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: `Order marked as ${orderStatus}`, order });
  }

  orderController.getPastOrdersBySupplier = async (req, res) => {
    try {
      const supplierId = req.params.id;
      
      const orders = await Order.find({
        supplierId: new mongoose.Types.ObjectId(supplierId),
        orderStatus: { $in: ['Delivered', 'Rejected'] }
      });      
      
      if (!orders || orders.length === 0) {
        return res.status(200).json({ message: "No orders found for this supplier", orders: [] });
      }
      
      const userIds = [...new Set(orders.map(order => order.userId))];
      
      const users = await User.find({ 
        _id: { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) }
      });
      
      const userMap = {};
      users.forEach(user => {
        userMap[user._id.toString()] = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address
        };
      });
      
      const ordersWithUserInfo = orders.map(order => {
        const orderObj = order.toObject();
        orderObj.userInfo = userMap[order.userId.toString()] || null;
        return orderObj;
      });
      
      res.status(200).json({ 
        message: "Orders retrieved successfully", 
        orders: ordersWithUserInfo 
      });
      
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = orderController;