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
    const newUrl = new urlModel({ longUrl, urlCode });
    newUrl.save();
    const shortUrl = `${process.env.BASE_URL}/api/url/short/${newUrl.urlCode}`;
    return res.status(201).json({
      status: true,
      message: "Short URL created successfully",
      data: { shortUrl },
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
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
    return res.status(200).json({
      status: true,
      message: "Short URL found",
      data: { longUrl: url.longUrl },
    });
  } catch (error) {
    console.log("��� ~ error:", error);
    return res
      .status(500)
      .json({ status: false, message: error.message, data: {} });
  }
};
