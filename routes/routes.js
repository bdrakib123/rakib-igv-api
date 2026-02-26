const express = require("express");
const router = express.Router();
const { downloadInstagram } = require("../controllers/instagramController");

router.get("/instagram", downloadInstagram);
router.get("/download", downloadInstagram);

module.exports = router;
