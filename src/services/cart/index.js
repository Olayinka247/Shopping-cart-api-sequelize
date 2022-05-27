import express from "express";
import models from "../../db/models/index.js";

const { Cart, Product } = models;

//create router for cart
const cartRouter = express.Router();

// delete a product from cart
cartRouter.delete("/:productId", async (req, res, next) => {});

export default cartRouter;
