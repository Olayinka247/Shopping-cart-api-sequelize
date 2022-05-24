import express from "express";
import models from "../../db/models/index.js";

const { Product, Review } = models;

const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      //   include: { model: Review, attributes: ["text", "username"] },
    });
    res.send(products);
  } catch (error) {
    console.log(error);
    next(err);
  }
});
productRouter.get("/:productId", async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.productId, {
      include: Blog,
    });
    if (!products) {
      res.status(404).send("Not found");
    } else {
      res.send(products);
    }
  } catch (error) {
    console.log(error);
    next(err);
  }
});
productRouter.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.send(product);
  } catch (error) {
    console.log(error);
    next(err);
  }
});
productRouter.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      returning: true,
      where: {
        id: req.params.productId,
      },
    });
    res.send(product[1][0]);
  } catch (error) {
    console.log(error);
    next(err);
  }
});

productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const rows = await Product.destroy({
      where: {
        id: req.params.productId,
      },
    });
    res.send({ rows });
  } catch (error) {
    console.log(error);
    next(err);
  }
});

export default productRouter;
