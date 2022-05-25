import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const Review = sequelize.define("review", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Review;
