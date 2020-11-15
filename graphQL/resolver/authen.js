const jwt = require("jsonwebtoken");
const { secret } = require("./config");
module.exports = (ctx) => {
    if (ctx.request.headers.token) {
        let verified = jwt.verify(ctx.request.headers.token, secret);

        return verified;
    }
};