const express = require("express");
const welfareRequest = require("../controllers/approval.js");
const router = express.Router();

router.get("/", welfareRequest.removeRequest);

module.exports = router;
