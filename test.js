const { request } = require("express");

//const Products = require("./products");
const http = require("http");
const path = require("path");
const fs = require("fs");
//const { default: products } = require("./products");

const Server = http.createServer((request, response) => {
  let filePath = path.join(
    __dirname,
    "RockPaperScissor",
    request.url === "/" ? "home.html" : request.url
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extname == "") filePath += ".html";

  // log the filePath
  console.log(filePath);

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end(content, "utf8");
          }
        );
      } else {
        //  Some server error
        response.writeHead(500);
        response.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 3000;

Server.listen(PORT, () => console.log(`server running on Port: ${PORT}`));
