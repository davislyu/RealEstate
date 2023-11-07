import express from "express";
import { google, signin, signup } from "../controllers/auth.contoller.js";

//Once this route is being triggered (/api/auth/signup) it sends a POST request with "signup" function which redirects us to the Controller

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
