const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart");
const authMiddleware = require("../middleware/auth");

// ==========================
// GET CART BY USER ID
// ==========================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cartList = await Cart.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      count: cartList.length,
      cart: cartList,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

