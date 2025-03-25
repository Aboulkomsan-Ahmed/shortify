const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/ShortUrl");
const shortid = require("shortid");
const QRCode = require("qrcode");

// POST endpoint to create a shortened URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required." });
  }

  try {
    // Generate a unique short code
    const shortCode = shortid.generate();

    // Automatically set expiry to 5 days from now
    const expiry = new Date(Date.now() + 60000);

    const newShortUrl = new ShortUrl({
      originalUrl,
      shortCode,
      expiryDate: expiry,
    });

    await newShortUrl.save();

    res.json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      originalUrl: newShortUrl.originalUrl,
      expiryDate: newShortUrl.expiryDate, // Optional: Return expiry date for confirmation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET endpoint to redirect to original URL
router.get("/:shortCode", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({
      shortCode: req.params.shortCode,
    });
    if (shortUrl) {
      // Increment click count
      shortUrl.clickCount++;
      await shortUrl.save();
      return res.redirect(shortUrl.originalUrl);
    }
    res.status(404).json({ error: "No URL found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// NEW: GET endpoint to generate QR Code for a given short URL
router.get("/:shortCode/qrcode", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({
      shortCode: req.params.shortCode,
    });
    if (!shortUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    const url = `${process.env.BASE_URL}/${shortUrl.shortCode}`;

    // Generate a QR code as a Data URL (base64 encoded image)
    QRCode.toDataURL(url, (err, qrDataUrl) => {
      if (err) {
        console.error("QR Code generation error:", err);
        return res.status(500).json({ error: "QR Code generation failed" });
      }
      res.json({ qrCode: qrDataUrl });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
