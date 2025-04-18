import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import session from "express-session";
import morgan from "morgan";
import { isSignedIn } from "./middleware/is-signed-in.js";
import { passUserToView } from "./middleware/pass-user-to-view.js";
import authController from "./controllers/auth.js"
import wishlistController from "./controllers/wishlist.js";
import communityController from "./controllers/community.js";
import path from "path";

const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
const ___dirname = path.resolve();

mongoose.connect(process.env.MONGODB_URI);
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"));
// Don't leave commented out code like this on main branch
// app.use(morgan("dev"));
// You can drop your pictures into the public/assets folder instead of having a seperate pictures folder
app.use(express.static(path.join(___dirname, "public")));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.get("/", (req,res) => {
    res.render("index.ejs", {
        user: req.session.user,
    });
});

app.use(passUserToView);
app.use("/auth", authController);
app.use(isSignedIn);
app.use("/users/:userId/wishlist", wishlistController);
app.use("/community", communityController);

// This can be modularized to its own file
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
    app.listen(port, ()=> {
        console.log("Listening on port "+ port);
    })
})

