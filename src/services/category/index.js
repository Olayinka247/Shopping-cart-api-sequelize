import express from "express";
import models from "../../db/models/index.js";

const { Category } = models;

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.get("/:categoryId", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.categoryId);
    if (!category) {
      res.status(404).send("Not found");
    } else {
      res.send(category);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.send(category);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.put("/:categoryId", async (req, res, next) => {
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.categoryId },
      returning: true,
    });
    res.send(category[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
categoryRouter.delete("/:categoryId", async (req, res, next) => {
  try {
    const rows = await Category.destroy({
      where: { id: req.params.categoryId },
    });
    res.send({ rows });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default categoryRouter;
