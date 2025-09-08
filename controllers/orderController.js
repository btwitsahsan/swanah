const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { sendOrderStatusMail, sendOrderConfirmationMail } = require("./mailer");

const placeOrder = expressAsyncHandler(async (req, res) => {
  const { items, totalPrice, shippingInfo } = req.body;
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not authenticated");
  // }

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("No items in order");
  }

  if (!totalPrice || totalPrice <= 0) {
    res.status(400);
    throw new Error("Invalid total price");
  }

  if (!shippingInfo || typeof shippingInfo !== "object") {
    res.status(400);
    throw new Error("Invalid shipping info");
  }

  try {
    const order = await Order.create({
      // user: req.user._id,
      items,
      totalPrice,
      shippingInfo,
      status: "Processing",
    });
    
    await sendOrderConfirmationMail(order);
    
    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to place order");
  }
});




// Get orders for the logged-in user
const getOrders = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

  if (!orders) {
    res.status(404);
    throw new Error("No orders found");
  }

  res.status(200).json(orders);
});





// Get orders for the logged-in admin
const getAdminOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find()
     .populate("shippingInfo", "name email phoneNo address city postalCode")
      .populate("items", "name price image")
      .sort({ createdAt: -1 });

  if (!orders) {
    res.status(404);
    throw new Error("No orders found");
  }

  res.status(200).json(orders);
});









// updateOrderStatus
const updateOrderStatus = expressAsyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("No orders found");
  }

  order.status = status;
  await order.save();

// send email to customer update about order 

res.status(200).json({ message: "Order updated successfully", order });

await sendOrderStatusMail(order);
});

module.exports = {
  placeOrder,
  getOrders,
  getAdminOrders,
  updateOrderStatus,
};
