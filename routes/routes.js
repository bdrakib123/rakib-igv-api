const express = require("express");
const router = express.Router();

const { downloadInstagram } = require("../controllers/instagramController");

// 🔽 Instagram API
router.get("/instagram", downloadInstagram);
router.get("/download", downloadInstagram);

// 🔽 Direct File Download (Proxy)
router.get("/download-file", async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "File URL required"
      });
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({
        status: false,
        message: "Failed to fetch file"
      });
    }

    const contentType = response.headers.get("content-type") || "video/mp4";

    let filename = "file.mp4";
    if (contentType.includes("image")) {
      filename = "image.jpg";
    }

    // 🔥 FIX: buffer use instead of pipe
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", contentType);

    res.send(buffer);

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
});
module.exports = router;
