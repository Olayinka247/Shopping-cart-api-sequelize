import express from "express";
import Category from "../../db/models/category.js";
import models from "../../db/models/index.js";

const { Product, Review, User, productCategory } = models;

const productRouter = express.Router();

// ENDPOINT TO GET PRODUCTS
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: req.query.search && {
        [Op.or]: [
          { name: { [Op.iLike]: `%${req.query.search}%` } },
          { description: { [Op.iLike]: `%${req.query.search}%` } },
        ],
      },
      include: [
        User,
        {
          model: Review,
          include: { model: User, attributes: ["name", "lastName"] },
        },
        { model: Category, through: { attributes: [] } },
      ],
      offset: req.query.limit * req.query.offset,
      limit: req.query.limit,
      order: [["createdAt", "DESC"]],
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
    const { name, description, price, imageUrl, categories } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
    });
    res.send(product);
    const productsId = product.productId;
    const data = [];
    if (categories) {
      categories.forEach((category) => {
        data.push({
          productsId,
          category,
        });
      });
      await productCategory.bulkCreate(data);
      res.send(product);
    }
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
