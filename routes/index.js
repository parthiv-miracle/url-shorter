const express = require("express");
const {
  createShortUrlAction,
  getShortUrlAction,
  getAllShortAction,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/url/short", createShortUrlAction);
router.get("/url/short/list", getAllShortAction);
router.get("/:urlCode", getShortUrlAction);

module.exports = router;
