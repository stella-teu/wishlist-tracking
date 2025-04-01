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
        const user = await User.findById(req.session.user._id);
        // watchedUser is the other user which we're looking at
        const watchedUser = await User.findById(req.params.userId);
        res.render("community/show.ejs", { watchedUser, user });
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

router.get("/show/:userId/:itemId",async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const watchedUser = await User.findById(req.params.userId);
        const item = watchedUser.wishlist.id(req.params.itemId);
        res.render("community/item-details.ejs", { watchedUser, user, item });
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
})

export default router;