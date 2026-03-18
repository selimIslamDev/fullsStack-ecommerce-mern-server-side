const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// dotenv শুধু local এর জন্য
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
const subCategoryRoutes = require("./routes/subCategory");
const productWeightRoutes = require("./routes/productWeight");
const productSizeRoutes = require("./routes/productSize");
const productRamsRoutes = require("./routes/productRams");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const reviewRoutes = require("./routes/productReviews");
const myListRoutes = require("./routes/myList");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payment");
const bannerRoutes = require("./routes/banners");

// Route use
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/productWeight", productWeightRoutes);
app.use("/api/productSize", productSizeRoutes);
app.use("/api/productRams", productRamsRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/myList", myListRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/banners", bannerRoutes);

// DB Connection (Updated - no old options)
if (!global._mongoose) {
  global._mongoose = mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("✅ DB Connected"))
    .catch((err) => console.log("❌ DB Error:", err));
}

// Test route (optional)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Local run এর জন্য (Vercel এ ignore হবে)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
  });
}

// MUST EXPORT (Vercel এর জন্য)
module.exports = app;















// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");

// // dotenv শুধু local এর জন্য
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// // Routes
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/products");
// const subCategoryRoutes = require("./routes/subCategory");
// const productWeightRoutes = require("./routes/productWeight");
// const productSizeRoutes = require("./routes/productSize");
// const productRamsRoutes = require("./routes/productRams");
// const userRoutes = require("./routes/user");
// const cartRoutes = require("./routes/cart");
// const reviewRoutes = require("./routes/productReviews");
// const myListRoutes = require("./routes/myList");
// const orderRoutes = require("./routes/orders");
// const paymentRoutes = require("./routes/payment");
// const bannerRoutes = require("./routes/banners");

// // Route use
// app.use("/api/category", categoryRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/subCategory", subCategoryRoutes);
// app.use("/api/productWeight", productWeightRoutes);
// app.use("/api/productSize", productSizeRoutes);
// app.use("/api/productRams", productRamsRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/user", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/myList", myListRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/banners", bannerRoutes);

// // DB Connection (Vercel safe)
// if (!global._mongoose) {
//   global._mongoose = mongoose
//     .connect(process.env.CONNECTION_STRING, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("✅ DB Connected"))
//     .catch((err) => console.log("❌ DB Error:", err));
// }

// // Test route (optional but useful)
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // ❌ IMPORTANT: app.listen() ব্যবহার করা যাবে না Vercel এ

// // ✅ MUST EXPORT
// module.exports = app;

















// const fs = require("fs");
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");



// // if (!fs.existsSync("./uploads")) {
// //     fs.mkdirSync("./uploads");
// // }
// if (process.env.NODE_ENV !== 'production') {
//     require("dotenv").config();
// }
// app.use(cors());
// // app.use(cors({
// //   origin: ["http://localhost:5173", "http://localhost:5174"],
// //   credentials: true,
// // }));

// app.use(express.json({ limit: '50mb' })); 
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// // ----------------------------------

// // Routes
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/products");
// const subCategoryRoutes = require("./routes/subCategory");
// const productWeightRoutes = require("./routes/productWeight");
// const productSizeRoutes = require("./routes/productSize");
// const productRamsRoutes = require("./routes/productRams");
// const userRoutes = require("./routes/user");
// const cartRoutes = require("./routes/cart");
// const reviewRoutes = require("./routes/productReviews");
// const myListRoutes = require("./routes/myList");
// const orderRoutes = require("./routes/orders");
// const paymentRoutes = require("./routes/payment");
// const bannerRoutes = require("./routes/banners");


// app.use("/api/category", categoryRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/subCategory", subCategoryRoutes);
// app.use("/api/productWeight", productWeightRoutes);
// app.use("/api/productSize", productSizeRoutes);
// app.use("/api/productRams", productRamsRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/user", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/myList", myListRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/banners", bannerRoutes);

// // Database connection
// // mongoose
// //   .connect(process.env.CONNECTION_STRING)
// //   .then(() => {
// //     console.log("Database connection is ready...");

// //     app.listen(process.env.PORT || 5000, () => {
// //       console.log(`Server is running on port ${process.env.PORT || 5000}`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.log("Database connection error:", err);
// //   });

// // Database connection (listen কে বাইরে নিয়ে আসুন)
// // mongoose
// //   .connect(process.env.CONNECTION_STRING)
// //   .then(() => {
// //     console.log("Database connection is ready...");
// //   })
// //   .catch((err) => {
// //     console.log("Database connection error:", err);
// //   });

// // // app.listen কে mongoose এর বাইরে নিয়ে আসুন
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// // // এই লাইনটি অবশ্যই যোগ করবেন (খুবই জরুরি)
// // module.exports = app;


// // Database connection
// mongoose
//   .connect(process.env.CONNECTION_STRING)
//   .then(() => console.log("Database connection is ready..."))
//   .catch((err) => console.log("Database connection error:", err));

// // listen কে mongoose এর বাইরে রাখুন
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // এই লাইনটি মাস্ট
// module.exports = app;



















