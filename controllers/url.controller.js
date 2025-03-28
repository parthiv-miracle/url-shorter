let nanoid;
import("nanoid").then((module) => {
  nanoid = module.nanoid;
});

const { urlModel } = require("../models/url.model");

exports.createShortUrlAction = (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid input", data: {} });
    }
    const urlCode = nanoid(6);
    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
    const newUrl = new urlModel({ longUrl, urlCode, shortUrl });
    newUrl.save();
    return res.status(201).json({
      status: true,
      message: "Short URL created successfully",
      data: {},
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: error.message, data: {} });
  }
};

exports.getAllShortAction = async (req, res) => {
  try {
    const urls = await urlModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      status: true,
      message: "All short URLs found",
      data: urls,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: error.message, data: {} });
  }
};

exports.getShortUrlAction = async (req, res) => {
  try {
    const { urlCode } = req.params;
    const url = await urlModel.findOne({ urlCode });
    if (!url) {
      return res.status(404).json({
        status: false,
        message: "Short URL not found",
        data: {},
      });
    }
    return res.redirect(url.longUrl);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: error.message, data: {} });
  }
};
