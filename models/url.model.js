const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    urlCode: String,
    longUrl: String,
    // shortUrl: String,
  },
  { timestamps: true }
);

exports.urlModel = mongoose.model("url", urlSchema);
