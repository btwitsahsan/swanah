const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

const dashboard = expressAsyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments();
  const userCount = await User.countDocuments();
  const orderCount = await Order.countDocuments();
  res.status(201).json({productCount, userCount, orderCount});
});

const createProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    description,
    isFeatured,
    images,
    price,
    cPrice,
    color,
    sizes,   // ✅ new
  } = req.body;

  if (!name || !category || !brand || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const product = await Product.create({
    name,
    category,
    brand,
    description,
    isFeatured,
    images,
    price,
    cPrice,
    color,
    sizes,  // ✅ now saving sizes with stock
  });

  res.status(201).json(product);
});


const getProducts = expressAsyncHandler(async (req, res) => {
  const category = req.query.category;
  let products;
  if(category){
     products = await Product.find({category}).sort("-createdAt");
  }else{
     products = await Product.find().sort("-createdAt");
  }
  res.status(201).json(products);
});


const getProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(201).json(product);
});

// Delete Product
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Product Deleted" , product});
});


const updateProduct = expressAsyncHandler(async (req, res) => {
  // console.log(req.body.name);
  const {
    name,
    category,
    brand,
    description,
    images,
    price,
    color,
    sizes,
    isFeatured
  } = req.body;

  // console.log({ name, category, brand, description, images, price, color, sizes, isFeatured});

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { name, category, brand, description, images, price, color, sizes, isFeatured }, // ✅ update sizes
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedProduct);
});



// Review Product
const reviewProduct = expressAsyncHandler(async (req, res) => {
  const {star, review, reviewDate} = req.body;

  const {id} = req.params
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add a star or review");
  }

  const product = await Product.findById(id);

  if(!product){
    es.status(400);
    throw new Error("Product not found");
  }
  
  product.ratings.push(
    {
      star,
      review, 
      reviewDate,
      name: req.user.name,
      userID: req.user._id,
    }
  )
  product.save()


  res.status(200).json({message: "Peoduct review added"});
});

// Delete Review Product
const deleteReview = expressAsyncHandler(async (req, res) => {
  const {userID} = req.body;
  const product = await Product.findById(req.params.id);

  if(!product){
    res.status(400);
    throw new Error("Product not found");
  }

  const newRatings = await product.ratings.filter((rating) => rating.userID.toString() !== userID.toString())

  product.ratings = newRatings;
  product.save();

  
  res.status(200).json({message: "Peoduct review deleted"});
});

// Update Review Product
const updateReview = expressAsyncHandler(async (req, res) => {
  const {userID} = req.body;
  const product = await Product.findById(req.params.id);

  if(!product){
    res.status(400);
    throw new Error("Product not found");
  }
  
  if(req.user._id.toString() !== userID){
    res.status(401);
    throw new Error("User not authorized"); 
  }

  const updateReview = await Product.findByIdAndUpdate({
    _id: product._id,
    "ratings.userID": mongoose.Types.ObjectId(userID)
  },{
    $set: {
      "ratings.$.star": star,
      "ratings.$.review": review,
      "ratings.$.reviewDate": reviewDate,
    }
  })

  res.status(200).json({message: "Peoduct review updated"});
});








module.exports = {
  dashboard,
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
