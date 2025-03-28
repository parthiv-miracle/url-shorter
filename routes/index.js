const express = require("express");
const { createShortUrlAction, getShortUrlAction } = require("../controllers/url.controller");
const router = express.Router();

router.post("/url/short", createShortUrlAction);
router.get("/url/short/:urlCode", getShortUrlAction);

module.exports = router;
