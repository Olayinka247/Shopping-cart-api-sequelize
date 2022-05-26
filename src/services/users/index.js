import express from "express";
import models from "../../db/models/index.js";

const { User } = models;

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }

  userRouter.get("/:userId", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        res.status(404).send("Not found");
      } else {
        res.send(user);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  userRouter.post("/", async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  userRouter.put("/:userId", async (req, res, next) => {
    try {
      const user = await User.update(req.body, {
        where: { id: req.params.userId },
        returning: true,
      });
      res.send(user[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  userRouter.delete("/:userId", async (req, res, next) => {
    try {
      const rows = await User.destroy({
        where: { id: req.params.userId },
      });
      res.send({ rows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
});

export default userRouter;
