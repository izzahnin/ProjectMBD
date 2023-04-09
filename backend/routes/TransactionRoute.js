import express from "express";
import {
  getTransactions,
  getTransactionById,
  updateTransaction,
} from "../controllers/TransactionController.js";

const router = express.Router();

router.get('/transaction', getTransactions)
router.get('/transaction/:id', getTransactionById)
router.put('/transaction/:id', updateTransaction)


export default router;