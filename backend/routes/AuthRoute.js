import express from "express";
import {Login, logOut, Me} from "../controllers/AuthController.js";
import { createUser } from "../controllers/UsersController.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.post('/signup', createUser);
router.delete('/logout', logOut);

export default router;