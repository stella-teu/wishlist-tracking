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

router.post("/sign-up", async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmPassword){
            return res.send("Passwords don't match.")
        }
    
        const userInDatabase = await User.findOne({ username : req.body.username });
        if (userInDatabase){
            return res.send("Username is already taken.")
        }
    
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
    
        const user = await User.create(req.body);
        res.redirect("/auth/sign-in");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

router.post("/sign-in", async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (!userInDatabase){
            return res.send("This user does not exist.")
        }

        const validPassword = bcrypt.compareSync(
            req.body.password, userInDatabase.password
        );

        if (!validPassword){
            return res.send("Login failed. Please try again.");
        }

        req.session.user = {
            username: req.body.username,
            _id: userInDatabase._id,
        }

        res.redirect("/");

    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

router.get("/sign-out", (req,res) => {
    req.session.destroy();
    res.redirect("/");
})

export default router;