const express = require("express");
const Employees = require("../controllers/employees.js");
const router = express.Router();
const fs = require("fs");

router.put("/", Employees.updateMood);

module.exports = router;
