const expressAsyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Category = require("../models/categoryModel");


const addCategory = expressAsyncHandler(async (req, res) => {
  
  const {name} = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const category = await Category.create({
    name
  });

  res.status(201).json(category);
});


const getCategories = expressAsyncHandler(async (req, res) => {
    const categories = await Category.find().sort("-createdAt");
 
  res.status(201).json(categories);
});




// Delete Category
const deleteCategory = expressAsyncHandler(async (req, res) => {
  // console.log(helo);
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("category not found");
  }
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Category Deleted" , category});
});



module.exports = {
  addCategory,
  getCategories,
  deleteCategory
};
