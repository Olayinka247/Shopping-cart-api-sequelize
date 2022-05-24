import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { testDB } from "./db/index.js";
import sequelize from "./db/index.js";
import productRouter from "./services/products/index.js";
import reviewRouter from "./services/reviews/index.js";

const server = express();

const { PORT = 3001 } = process.env;

server.use(express.json());

server.use(cors());

server.use("/products", productRouter);
server.use("/reviews", reviewRouter);

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.table(listEndpoints(server));
      console.log("✅ Server is listening on port " + PORT);
      await testDB();
      await sequelize.sync({ force: true });
    });

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initalize();
