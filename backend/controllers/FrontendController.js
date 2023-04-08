import { Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import Transaction from "../models/TransactionModel.js";
import DetailTrans from "../models/DetailTransModel.js";
import Customers from "../models/CustomerModel.js";
// const { v4:  } = require("uuid");
const { Op } = Sequelize;

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
  let keyword = "";
  const condition = [];
  if (req.query.keyword) {
    keyword = req.query.keyword;
    condition.push({ name: { [Op.like]: "%" + keyword + "%" } });
  }

  try {
    const response = await Product.findAll({
      where: {
        name: { [Op.like]: "%" + keyword + "%" },
      },
    }).then((result) => {
      if (result.length > 0) {
        res.status(200).json(response);
      } else {
        return res.status(404).json({ msg: `No Data Found with keyword '${keyword}'` });
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
    where: { uudi: uudi },
  })
    .then((result) => {
      if (result) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ msg: "No Data Found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
};

export const getCartData = async (req, res) => {
  const sessionId = req.query.sessionId;
  Cart.findAll({
    where: { sessionId: sessionId },
    attributes: ["id", "uuid", "quantity", "sessionId", "createdAt"],
    include: [
      {
        model: Product,
        attributes: ["id", "uuid", "name", "stock", "price", "image", "url"],
      },
    ],
  })
    .then((result) => {
      if (result.length > 0) {
        // res.status(200).json(response).(result);
        res.send({
          code: 200,
          msg: "Data has been added to cart",
          data: result,
        });
      } else {
        res.status(404).json({ msg: "No Data Found in Cart" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
      // CANNOT ACCESS 'RESPONSE' BEFORE IINITIALIZATION
    });
};

export const addCartData = async (req, res) => {
  const checkCart = await Cart.findOne({
    where: [
      {
        productId: req.body.productId,
      },
      {
        sessionId: req.body.sessionId,
      },
    ],
  });

  if (checkCart !== null) {
    const data = {
      productId: req.body.productId,
      quantity: checkCart.quantity + 1,
      sessionId: req.body.sessionId,
    }

    await Cart.update(data, {
      where: {id: checkCart.id}
    }).then(result => {
      res.status(200).json({msg: "Data has been updated"})
    }).catch(error => {

    })
  } else {
    const data = {
      productId: req.body.productId,
      quantity: req.body.quantity,
      sessionId: req.body.sessionId,
    };

    await Cart.create(data)
      .then((result) => {
        res.send({
          code: 200,
          msg: "Data has been added to cart",
          data: result,
        });
      })
      .catch((error) => {
        res.status(500).json({ msg: "error.message" });
      });
  }
};

export const updateCartData = async (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;

  Cart.update(
    { quantity: quantity },
    {
      where: { id: id },
    }
  )
    .then((result) => {
      if (result[0]) {
        res.status(200).json({ msg: "Data has been updated" });
      } else {
        res.status(422).json({ msg: "Data can not be updated" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "error.message" });
    });
};

export const deleteCartData = async (req, res) => {
  const id = req.params.id;
  Cart.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({ msg: "Data has been deleted" });
    })
    .catch((error) => {
      res.status(500).json({ msg: "error.message" });
    });
};

export const checkout = async (req, res) => {
  const sessionId = req.query.sessionId;
  const data = {
    name : req.body.name,
    email : req.body.email,
    phone : req.body.phone,
    address : req.body.address,
  }

  const dataCart = await Cart.findAll({
    where: { sessionId: sessionId },
  });

  if (dataCart.length > 0) {
    const transNumber = 'TRS-'+ Date.now();
    const transId = uuidv4();

    
    const dataTransaction = {
      id: transId,
      transNumber : transNumber,
    }

    await Transaction.create(dataTransaction);

    await dataCart.map((item, index) => {
      const dataDetail = {
        quantity: item.quantity,
        productId: item.productId,
      };

      DetailTrans.create(dataDetail);
      Cart.destroy({ where: { id: item.id } });
    })

    await Customers.create(data);

    await res.status(200).json({msg: "Data has been checkout"})
  }
};
