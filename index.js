const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const products = require("./data");
require('dotenv').config()
const port = process.env.PORT || 5000;

//Middleware morgan/cors
app.use(cors()); //cross platform
app.use(logger("dev")); //Logger
app.use(express.json()); //req.body

//GET: http://localhost:3000/
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Home page" });
});

//GET: http://localhost:3000/user
app.get("/user", (req, res) => {
  const user = [
    {
      name: "Mark Zuckerberg",
      age: 55,
      gender: "Male",
    },
  ];
  return res.status(200).json({
    data: true,
    user: user,
  });
});

//POST: http://localhost:3000/user
app.post("/user", (req, res) => {
  const data = req.body;
  console.log("ID", data.id);
  console.log("Name", data.name);
  console.log("Age", data.age);
  console.log("Gender", data.gender);
  return res.status(201).json({
    data: true,
    user: data,
  });
});

//PUT: http://localhost:3000/user
app.put("/user", (req, res) => {
  const data = req.body;
  console.log("ID", data.id);
  console.log("Name", data.name);
  console.log("Age", data.age);
  console.log("Gender", data.gender);
  return res.status(201).json({
    data: true,
    user: data,
    message: "Update user successfully!",
  });
});

//DELETE: http://localhost:3000/user
app.delete("/user", (req, res) => {
  const data = req.body;
  return res.status(201).json({
    data: true,
    message: "Delete user successfully!",
  });
});

//Get All Products GET : http://localhost:3000/api/products
app.get("/api/products", (req, res) => {
  const partial_products = products.map((product) => {
    return { id: product.id, name: product.name };
  });
  res.status(200).json(partial_products);
});

//Get Products ByID GET : http://localhost:3000/api/products/1
app.get("/api/products/:productID", (req, res) => {
  const id = Number(req.params.productID);
  const product = products.find((product) => product.id === id);
  if (!product) {
    return res.status(404).json({ Message: "Product not found" });
  }
  return res.status(200).json(product);
});

//Query String Get GET: http://localhost:3000/api/query/?name=phone
app.get('/api/query', (req,res) => {
    const name = req.query.name.toLowerCase()
    const products_result = products.filter(
        (product) => product.name.toLowerCase().includes(name)
    )
    if (products_result.length < 1) {
        return res.status(404).send("No products matched your search ")
    }
    return res.json(products_result);
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
