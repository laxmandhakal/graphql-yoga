const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    message: { type: String },
    userid: {
        type: Schema.Types.ObjectID,
        ref: "userinfo",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("messageinfo", chatSchema);