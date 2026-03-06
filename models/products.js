const mongoose = require("mongoose");
const { productWeightSchema } = require("./productWeight");
const { productSizeSchema } = require("./productSize");
const { productRamsSchema } = require("./productRams");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  imagePublicIds: [
    {
      type: String,
      required: true,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
// productSchema তে subCat এর পরে এই fields add করো:
oldPrice: {
  type: Number,
  default: 0,
},
discount: {
  type: Number,
  default: 0,
},
productRam: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "ProductRamsSchema",
  default: null,
},
productSize: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "ProductSizeSchema",
  default: null,
},
productWeight: {
  type: mongoose.Schema.Types.ObjectId,
    ref: "ProductWeight",
  default: null,
},
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  location: {
    // ✅ নতুন যোগ হয়েছে
    type: String,
    default: "dhaka",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
