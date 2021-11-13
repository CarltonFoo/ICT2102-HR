const express = require("express");
const welfareRequest = require("../controllers/approval.js");
const router = express.Router();
const fs = require("fs");

// router.get("/", welfareRequest.removeWelfareRequest);
router.delete("/", welfareRequest.removeWelfareRequest);

module.exports = router;
