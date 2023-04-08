import express from "express";
import {
  getDetailTranss,
  getDetailTransById,
  createDetailTrans,
  updateDetailTrans,
  deleteDetailTrans
} from "../controllers/DetailTransController.js";

const router = express.Router();

router.get('/detailTranss', getDetailTranss)
router.get('/detailTranss/:id', getDetailTransById)
router.post('/detailTranss', createDetailTrans)
router.patch('/detailTranss/:id', updateDetailTrans)
router.delete('/detailTranss/:id', deleteDetailTrans)

export default router;