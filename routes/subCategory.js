const { SubCat } = require("../models/subCat");
const express = require("express");
const router = express.Router();

// GET all subCategories
router.get("/", async (req, res) => {
  try {
    const subCatList = await SubCat.find();

    if (!subCatList) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).json(subCatList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET single subCategory by ID
router.get("/:id", async (req, res) => {
  try {
    const subCat = await SubCat.findById(req.params.id);

    if (!subCat) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subCat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



// CREATE subCategory
router.post("/create", async (req, res) => {
  try {
    let subCat = new SubCat({
      category: req.body.category,
      subCat: req.body.subCat,
    });

    subCat = await subCat.save();

    res.status(201).json(subCat);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

module.exports = router;