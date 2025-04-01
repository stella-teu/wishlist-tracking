import { Router } from "express";
import User from "../models/user.js";

const router = Router();

router.get("/", async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render("wishlist/index.ejs", { items: currentUser.wishlist });
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

router.get("/new", async (req, res) => {
    res.render("wishlist/new.ejs");
})

router.post("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.wishlist.push(req.body);
        await currentUser.save();
        res.redirect("/users/"+req.session.user._id+"/wishlist");
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

router.get("/:itemId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = await currentUser.wishlist.id(req.params.itemId);
        res.render("wishlist/show.ejs", { item: item });
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
})

export default router;