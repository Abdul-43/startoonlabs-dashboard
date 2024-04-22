import express from 'express'
import { getAll, login, signup } from '../controller/user.js';

const router=express.Router();

//http://localhost:8800/api/signup

router.post("/signup",signup);
router.get("/get",getAll);
router.post("/login",login);

export {router};