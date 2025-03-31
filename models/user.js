import mongoose, { model } from "mongoose";

const wishlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    wishlist: [wishlistSchema],
})

const User = mongoose.model("User", userSchema);

export default User;