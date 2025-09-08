const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "please add a brand"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "please add a color"],
      default: "As seen",
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "please add a price"],
      trim: true,
    },   
    cPrice: {
      type: Number,
      required: [true, "please add a compare price"],
      trim: true,
    },   
    description: {
      type: String,
      required: [true, "please add a description"],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String], // multiple image URLs
      default: [],
    },
    sizes: [
      {
        size: { type: String, required: true },   // e.g. "S", "M", "L"
        stock: { type: Number, required: true, default: 0 } // e.g. 10
      }
    ],
    rating: {
      type: [Object], // could later be refined into a review schema
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
