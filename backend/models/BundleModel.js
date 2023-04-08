// TIDAK TERPAKE, TAPI JANGAN DIHAPUS DULU
// TIDAK TERPAKE, TAPI JANGAN DIHAPUS DULU

import Sequelize from 'sequelize';
import db from "../config/Database.js";
// import DetailTrans from './DetailTransModel.js';

const { DataTypes, Sequelize, sequelize } = Sequelize;

Product = require("./ProductModel.js");
Cart = require("./CartModel.js");
DetailTrans = require("./DetailTransModel.js");
Customer = require("./CustomerModel.js");

Users.hasMany(Products, {onDelete: 'SET NULL'});
Products.belongsTo(Users, {foreignKey: 'userId', onDelete: 'SET NULL'});


db.product.hasMany(db.cart, { foreignKey: "product_id" , onDelete: 'CASCADE'});
db.cart.belongsTo(db.product, { foreignKey: "product_id" });

db.product.hasMany(db.transactionDetail, { foreignKey: "product_id" , onDelete: 'SET NULL'});
db.transactionDetail.belongsTo(db.product, { foreignKey: "product_id"});

db.transaction.hasMany(db.transactionDetail, { foreignKey: "trs_id",});
db.transactionDetail.belongsTo(db.transaction, { foreignKey: "trs_id",});

db.transaction.hasOne(db.customer, { foreignKey: "trs_id", onDelete: 'CASCADE'});
db.customer.belongsTo(db.transaction, { foreignKey: "trs_id",}); 