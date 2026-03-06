const express = require("express");
const router = express.Router();
const { ProductWeight } = require("../models/productWeight");

router.get("/", async (req, res) => {
  try {
    const weights = await ProductWeight.find();
    res.json(weights);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const weight = await ProductWeight.findById(req.params.id);
    if (!weight) return res.status(404).json({ success: false, message: "Not found" });
    res.json(weight);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.post("/create", async (req, res) => {
  try {
    const weight = new ProductWeight({ name: req.body.name });
    const saved = await weight.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await ProductWeight.findByIdAndUpdate(
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
    await ProductWeight.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;