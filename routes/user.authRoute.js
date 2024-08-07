import { Router } from "express";
import { registerUser } from '../controller/user.auth.js';

let route = Router();

route.get('/register', registerUser);


export default route;