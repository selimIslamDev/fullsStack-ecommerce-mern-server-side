const express = require("express");
const router = express.Router();
const { ProductSizeSchema } = require("../models/productSize");

router.get("/", async (req, res) => {
  try {
    const sizes = await ProductSizeSchema.find();
    res.json(sizes);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const size = await ProductSizeSchema.findById(req.params.id);
    if (!size) return res.status(404).json({ success: false, message: "Not found" });
    res.json(size);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const size = new ProductSizeSchema({ name: req.body.name });
    const saved = await size.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await ProductSizeSchema.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ProductSizeSchema.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;