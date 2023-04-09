import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductModel.js";
import Transaction from "./TransactionModel.js";

const { DataTypes } = Sequelize;

const DetailTrans = db.define(
  "detailTrans",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    transId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
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

Products.hasMany(DetailTrans);
DetailTrans.belongsTo(Products, { foreignKey: "productId" });

Transaction.hasMany(DetailTrans);
DetailTrans.belongsTo(Transaction, { foreignKey: "transId"});

export default DetailTrans;
