import User from "../models/user.js";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
})

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
})

export default router;