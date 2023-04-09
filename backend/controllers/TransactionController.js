import DetailTrans from "../models/DetailTransModel.js";
import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import Transaction from "../models/TransactionModel.js";
// import DetailTrans from "../models/DetailTransModel.js";

export const getTransactions = async (req, res) => {
  await Transaction.findAll({
    include: [
      {
        model: DetailTrans,
      },
    ],
  })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404), ({ msg: "No Data Found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

export const getTransactionById = async (req, res) => {};

export const updateTransaction = async (req, res) => {};
