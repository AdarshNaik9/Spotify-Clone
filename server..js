const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the "img" folder
app.use("/img", express.static(path.join(__dirname, "img")), serveIndex(path.join(__dirname, "img"), { icons: true }));

// Serve the index.html file
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});