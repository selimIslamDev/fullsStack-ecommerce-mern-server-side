const express = require("express");
const router = express.Router();
const { ProductRamsSchema } = require("../models/productRams");

router.get("/", async (req, res) => {
  try {
    const rams = await ProductRamsSchema.find();
    res.json(rams);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ram = await ProductRamsSchema.findById(req.params.id);
    if (!ram) return res.status(404).json({ success: false, message: "Not found" });
    res.json(ram);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const ram = new ProductRamsSchema({ name: req.body.name });
    const saved = await ram.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await ProductRamsSchema.findByIdAndUpdate(
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
    await ProductRamsSchema.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;