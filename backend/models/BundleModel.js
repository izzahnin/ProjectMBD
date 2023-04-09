// import Sequelize from 'sequelize';
// import db from "../config/Database.js";

// const { DataTypes, Sequelize, sequelize } = Sequelize;

// db.product = require("./ProductModel.js");
// db.cart = require("./CartModel.js");
// db.transaction = require("./TransactionModel.js");
// db.transactionDetail = require("./TransactionDetail.js");
// db.customer = require("./Customer.js");

// db.product.hasMany(db.cart, { foreignKey: "product_id" , onDelete: 'CASCADE'});
// db.cart.belongsTo(db.product, { foreignKey: "product_id" });

// db.product.hasMany(db.transactionDetail, { foreignKey: "product_id" , onDelete: 'SET NULL'});
// db.transactionDetail.belongsTo(db.product, { foreignKey: "product_id"});

// db.transaction.hasMany(db.transactionDetail, { foreignKey: "trs_id",});
// db.transactionDetail.belongsTo(db.transaction, { foreignKey: "trs_id",});

// db.transaction.hasOne(db.customer, { foreignKey: "trs_id", onDelete: 'CASCADE'});
// db.customer.belongsTo(db.transaction, { foreignKey: "trs_id",}); 