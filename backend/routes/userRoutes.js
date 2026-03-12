import express from "express";
import { LoginUser, logoutUser, RegisterUser } from "../controllers/User.controller.js";
import { AllTodo, CreateTodo, deletetodo, getSingleTodo, updateTodo } from "../controllers/Todo.controller.js";
import { verifyJwt } from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post('/login',LoginUser)
router.post('/create',verifyJwt,CreateTodo)
router.put('/update/:id',verifyJwt,updateTodo)
router.delete('/delete/:id',verifyJwt,deletetodo)
router.get('/todo/:id',verifyJwt,getSingleTodo)
router.get('/all-todo',verifyJwt,AllTodo)
router.post('/logout',verifyJwt,logoutUser)
router.get("/test", (req, res) => {
  res.send("User route working");
});

export default router; 
