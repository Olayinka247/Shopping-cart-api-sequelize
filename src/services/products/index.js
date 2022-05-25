import express from "express";
import models from "../../db/models/index.js";

const { Product, Review } = models;

const productRouter = express.Router();

// ENDPOINT TO GET PRODUCTS
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: Review,
    });
    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ENDPOINT TO GET PRODUCT BY ID
productRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: { model: Review },
    });
    if (!product) {
      res.status(404).send("Not found");
    } else {
      res.send(product);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//ENDPOINT TO POST NEW PRODUCTS
productRouter.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ENDPOINT TO MODIFY/UPDATE PRODUCTS
productRouter.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.productId },
      returning: true,
    });
    res.send(product[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ENDPOINT TO DELETE PRODUCTS
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const rows = await Product.destroy({
      where: { id: req.params.productId },
    });
    res.send({ rows });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default productRouter;
