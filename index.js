require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const videosRoutes = require("./routes/videos.js");

const PORT = process.env.PORT || 8082;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors());
app.use(express.json());

app.use("/videos", videosRoutes);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
