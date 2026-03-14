const express = require("express");
const router = express.Router();
const { HomeBanner } = require("../models/homeBanner");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// ==========================
// Multer Memory Storage
// ==========================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ==========================
// GET ALL BANNERS
// ==========================
router.get("/", async (req, res) => {
  try {
    const banners = await HomeBanner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================
// CREATE BANNER
// ==========================
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "ecommerce_banners",
    });

    const banner = new HomeBanner({
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    const saved = await banner.save();
    res.status(201).json({ success: true, banner: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================
// DELETE BANNER
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const banner = await HomeBanner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    // Cloudinary থেকে delete
    if (banner.imagePublicId) {
      await cloudinary.uploader.destroy(banner.imagePublicId);
    }

    await HomeBanner.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================
// UPDATE BANNER
// ==========================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const banner = await HomeBanner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    let imageUrl = banner.image;
    let imagePublicId = banner.imagePublicId;

    // নতুন image দিলে পুরনোটা Cloudinary থেকে delete করে নতুনটা upload করো
    if (req.file) {
      if (banner.imagePublicId) {
        await cloudinary.uploader.destroy(banner.imagePublicId);
      }

      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64, {
        folder: "ecommerce_banners",
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const updated = await HomeBanner.findByIdAndUpdate(
      req.params.id,
      { image: imageUrl, imagePublicId },
      { new: true }
    );

    res.status(200).json({ success: true, banner: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;