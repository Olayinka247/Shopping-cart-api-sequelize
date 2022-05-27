import express from "express";
import models from "../../db/models/index.js";
import { Op } from "sequelize";

const { Product, Review, User, productCategory, Category } = models;

const productRouter = express.Router();

// ENDPOINT TO GET PRODUCTS
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: req.query.search && {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
        ],
      },
      include: [
        User,
        { model: Review, attributes: ["text"] },

        { model: Category, Review },
      ],
      order: [["price", "ASC"]],
    });

    res.send(products);
  } catch (err) {
    next(err);
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
    const { name, description, price, image, categories } = req.body;
    const product = await Product.create({ name, description, price, image });
    res.send(product);
    const productId = product.id;
    const data = [];
    categories.forEach((categoryId) => {
      data.push({ productId, categoryId });
    });
    await productCategory.bulkCreate(data);
    res.send(product);
  } catch (err) {
    next(err);
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
