const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const helmet = require("helmet");
const fs = require("fs");
const compression = require("compression");
const nocache = require('nocache');

const port = process.env.PORT || 3000;

// cors issue
app.use(cors());
// app.use(helmet());

// compress all responses
app.use(compression());

// app.use(nocache());
// app.use(helmet.frameguard());
// app.use(
//   helmet({
//     frameguard: {
//       action: "deny",
//     },
//   })
// );

// other static resources should just be served as they are
app.use(express.static(path.resolve(__dirname, "build"), { maxAge: "30d" }));

// app.use(express.static("build"));

app.use("*", express.static("build"));

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

module.exports = app;
