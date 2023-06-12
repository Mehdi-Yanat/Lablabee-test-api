const express = require("express");
const { getLabs } = require("../controllers/labs.controllers");

const router = express.Router();

router.get("/", getLabs);

module.exports = router;
