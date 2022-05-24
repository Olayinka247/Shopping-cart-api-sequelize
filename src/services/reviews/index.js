import express from "express";
import models from "../../db/models/index.js";
const { Product, Review } = models;

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: Product,
    });
    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(err);
  }
});
reviewRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      res.status(404).send("Not found");
    } else {
      res.send(review);
    }
  } catch (error) {
    console.log(error);
    next(err);
  }
});
reviewRouter.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (error) {
    console.log(error);
    next(err);
  }
});
reviewRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const reviews = await Review.update(req.body, {
      where: {
        id: req.params.reviewId,
      },
      returning: true,
    });
    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(err);
  }
});

reviewRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const rows = Review.destroy({
      where: {
        id: req.params.reviewId,
      },
    });
    res.send({ rows });
  } catch (error) {
    console.log(error);
    next(err);
  }
});

export default reviewRouter;
