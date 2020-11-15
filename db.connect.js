const database = "mongodb://localhost:27017/test";
const remoteurl = "";
const mongoose = require("mongoose");
mongoose
    .connect(remoteurl || database)
    .then(() => {
        console.log("Connection to DB successful");
    })
    .catch((err) => {
        console.log("Db connection error====", err);
    });