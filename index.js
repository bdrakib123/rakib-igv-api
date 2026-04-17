const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 API Key Protection
app.use("/api", (req, res, next) => {
  const apiKey = req.headers["x-api-key"] || req.query.apikey;

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized! Invalid API Key"
    });
  }

  next();
});

const routes = require("./routes/routes");
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Rakib IGV API Running 🚀"
  });
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
