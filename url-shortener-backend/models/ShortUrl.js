const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  clickCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
});

// TTL index: documents will be automatically removed once expiryDate is reached.
shortUrlSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
