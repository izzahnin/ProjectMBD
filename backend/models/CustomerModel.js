import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Transaction from "./TransactionModel.js";

const { DataTypes } = Sequelize;

const Customers = db.define(
  "customers",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        len: [3, 100]
      }
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    transId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    }
  },
  {
    freezeTableName: true,
  }
);

Transaction.hasOne(Customers);
Customers.belongsTo(Transaction, {foreignKey: "transId"}, { onDelete: 'UPDATE' });

export default Customers;

// { onDelete: 'UPDATE'}