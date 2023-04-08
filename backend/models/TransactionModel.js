import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import DetailTrans from "./DetailTransModel.js";

const { DataTypes } = Sequelize;

const Transaction = db.define(
  "transaction",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    transNumber: {
      type: DataTypes.INTEGER,
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

export default Transaction;
