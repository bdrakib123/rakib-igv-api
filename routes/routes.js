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

    // fetch file
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({
        status: false,
        message: "Failed to fetch file"
      });
    }

    const contentType = response.headers.get("content-type");

    // file type detect
    let filename = "file";
    if (contentType.includes("video")) {
      filename = "video.mp4";
    } else if (contentType.includes("image")) {
      filename = "image.jpg";
    }

    // headers set (force download)
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", contentType);

    // stream file
    response.body.pipe(res);

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
});

module.exports = router;
