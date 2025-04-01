import User from "../models/user.js"
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.render("community/index.ejs", { users });
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

router.get("/show/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.render("community/show.ejs", { user });
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

export default router;