import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import session from "express-session";
import morgan from "morgan";

const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
mongoose.connect(process.env.MONGODB_URI);
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"));
// app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.get("/", (req,res) => {
    res.render("index.ejs", {
        user: req.session.user
    });
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
    app.listen(port, ()=> {
        console.log("Listening on port "+ port);
    })
})