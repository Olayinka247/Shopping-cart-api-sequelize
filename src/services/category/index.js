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

categoryRouter.post("/", async (req, res, next) => {
  try {
    const category = await Category.bulkCreate([
      { name: "Technology" },
      { name: "Electronics" },
      { name: "SmartPhones" },
      { name: "Tablets" },
      { name: "Computers" },
      { name: "Tv" },
    ]);
    res.send(category);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default categoryRouter;
