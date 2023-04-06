import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "product",
  {
    productName: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    url: DataTypes.STRING,
  },
  {
    freezeTableId: true,
  }
);

export default Product;

// membuat table product ketika tidak ada di database
(async () => {
  await db.sync();
})();
