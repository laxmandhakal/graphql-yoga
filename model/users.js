const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* defining users Schema */
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    phonenumber: {
        type: Number,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("userinfo", userSchema);