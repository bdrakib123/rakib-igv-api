const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const extractInstagramVideo = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  );

  let mediaUrl = null;

page.on("response", (response) => {
  const resUrl = response.url();

  if (
    (resUrl.includes(".mp4") || resUrl.includes(".jpg")) &&
    resUrl.includes("instagram")
  ) {
    mediaUrl = resUrl;
  }
});
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 60000
  });

  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();

  if (!mediaUrl) throw new Error("Media not found");

return mediaUrl;

module.exports = { extractInstagramVideo };
