const path = require("path");
const express = require("express");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const products = require("./Products");

const app = express();

const PORT = process.env.PORT || 5000;

//init middleware
app.use(logger);

// * handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (request, response) =>
  response.render("index", { title: "Product App", products: products })
);
// * Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Products API route
app.use("/api/product", require("./routes/api/products"));

// * Making Static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, console.log(`Server Started on Port: ${PORT}`));
