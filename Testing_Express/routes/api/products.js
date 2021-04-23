const express = require("express");
const products = require("../../Products");
const router = express.Router();
const uuid = require("uuid");

// ? Feting all products
router.get("/", (request, response) => response.json(products));

// ? Fetching single product
router.get("/:id", (request, response) => {
  const found = products.some(
    (product) => product.id === parseInt(request.params.id)
  );
  if (found) {
    response.json(
      products.filter((product) => product.id === parseInt(request.params.id))
    );
  } else {
    response
      .status(400)
      .json({ msg: `No member with the id of ${request.params.id}` });
  }
});

// ? listing a product
router.post("/", (request, response) => {
  const newProduct = {
    id: uuid.v4(),
    name: request.body.name,
    quantity: request.body.quantity,
  };
  if (!request.body.quantity || !request.body.name) {
    return response
      .status(400)
      .json({ msg: "Please inclued items name and quantity" });
  }
  products.push(newProduct);
  //response.send(products);
  response.redirect("/");
});

// ? Update a Product
router.put("/:id", (request, response) => {
  const found = products.some(
    (product) => product.id === parseInt(request.params.id)
  );
  if (found) {
    console.log("found");
    const updateProducts = request.body;
    products.forEach((product) => {
      if (product.id === parseInt(request.params.id)) {
        console.log("inside Update values");
        // -- Update Name if name was sent with the request
        product.name = updateProducts.name ? updateProducts.name : product.name;

        // -- Update quantity if quantity was sent with the request
        product.quantity = updateProducts.quantity
          ? updateProducts.quantity
          : product.quantity;

        // -- Message response
        response.json({
          msg: "The update request was fulfuilled",
          product: product,
        });
      }
    });
  } else {
    response
      .status(400)
      .json({ msg: `No member with the id of ${request.params.id}` });
  }
});

// ? deleting a product
router.delete("/:id", (request, response) => {
  const found = products.some(
    (product) => product.id === parseInt(request.params.id)
  );
  if (found) {
    response.json({
      msg: "Product Deleted",
      products: products.filter(
        (product) => product.id !== parseInt(request.params.id)
      ),
    });
  } else {
    response
      .status(400)
      .json({ msg: `No member with the id of ${request.params.id}` });
  }
});

module.exports = router;
