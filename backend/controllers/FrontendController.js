import { Sequelize } from "sequelize";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { response } from "express";

const {Op} = Sequelize;

export const getProductsHome = async (req, res) => {
  try {
    const response = await Product.findAll({
      limit: 8,
    }).then((result) => {
      if (result.length > 0) {
        res.status(200).json(response);
      } else {
        return res.status(404).json({ msg: "No Data Found" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductPage = async (req, res) => {
  let keyword = '';
  const condition = [];
  if(req.query.keyword){
    keyword = req.query.keyword;
    condition.push({name: {[Op.like]: '%' + keyword + '%'}});
  }

  try {
    const response = await Product.findAll({
      where: {
        name: {[Op.like]: '%' + keyword + '%'}
      }
    }).then(result => {
      if(result.length > 0) {
        res.status(200).json(response);
      } else{
        return res.status(404).json({msg: `No Data Found with keyword '${keyword}'`});
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductDetail = async (req, res) => {
  const uudi = req.params.uudi;
  const response = await Product.findOne({
    where: {uudi: uudi}
  }).then(result => {
    if(result){
      res.status(200).json(response);
    } else{
      res.status(404).json({msg: "No Data Found"});
    }
  }).catch(error => {
    res.status(500).json({msg: error.message});
  });
}

export const getCartData = async (req, res) => {
  const sessionId = req.body.sessionId;
  const response = await cart.findAll({
    where: {sessionId : sessionId}
  }).then(result => {
    if(result.length > 0){
      res.status(200).json(response);
    } else{
      res.status(404).json({msg: "No Data Found in Cart"})
    }
  }).catch(error => {
    res.status(500).json({msg: error.message});
  });
}
