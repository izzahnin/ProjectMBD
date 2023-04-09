import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductModel.js";

const { DataTypes } = Sequelize;

const Cart = db.define(
  "cart",
  {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
          notEmpty: true,
        }
      },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Products.hasMany(Cart);
Cart.belongsTo(Products, { foreignKey: "productId", onDelete: "CASCADE" });

export default Cart;
