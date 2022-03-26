const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next(true);
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync("./src/certificates/ainc-key.key"),
  cert: fs.readFileSync("./src/certificates/ainc-cert.crt"),
};
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(443, (err) => {
    if (err) throw err;
    console.log("> Server started on https://localhost:3000");
  });
});