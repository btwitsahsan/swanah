const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      brand: String,
      images: [String],
      size: String,
      color: String,
    },
  ],
  totalPrice: Number,
  shippingInfo: {
    name: String,
    email: String,
    phoneNo: Number,
    address: String,
    city: String,
    postalCode: String,
  },
  status: {
    type: String,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
