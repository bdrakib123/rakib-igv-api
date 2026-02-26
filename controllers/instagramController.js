const { extractInstagramVideo } = require("../services/scraperService");

exports.downloadInstagram = async (req, res) => {
  const { url } = req.query;

  if (!url)
    return res.status(400).json({
      status: false,
      message: "Instagram URL required"
    });

  try {
    const video = await extractInstagramVideo(url);

    res.json({
      status: true,
      platform: "instagram",
      video
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};
