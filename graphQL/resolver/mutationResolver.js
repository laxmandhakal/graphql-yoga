const userModels = require("../../model/users");
const chatModel = require("../../model/chat");
const { pubsub } = require("../helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const tokenChecker = require("./authen");

function getToken(username, email) {
    return jwt.sign({ username, email }, secret);
}
module.exports = {
    RootMutation: {
        createUser: async(_, args, ctx) => {
            try {
                let bpassword = await bcrypt.hash(args.newUser.password, 12);
                args.newUser.password = bpassword;
                let query = {
                    username: args.newUser.username,
                    password: bpassword,
                    email: args.newUser.email,
                    phonenumber: args.newUser.phonenumber,
                };
                const createUserDetails = await userModels.findOneAndUpdate(
                    query,
                    args.newUser, { upsert: true, new: true }
                );

                const { username, email } = createUserDetails;
                let token = getToken(username, email);

                return {...createUserDetails._doc, token };
            } catch (error) {
                return error;
            }
        },
        deleteUser: async(parent, args, ctx, info) => {
            let responseMSG = {};
            try {
                let query = { username: args.username, password: args.password };
                const createUserDetails = await userModels.findOneAndDelete(query);
                if (createUserDetails == null) {
                    responseMSG.response = "No User found for this opertaion";
                    return responseMSG;
                } else {
                    responseMSG.response = "Success";
                    return responseMSG;
                }
            } catch (error) {
                responseMSG.response = "Fail";
                return responseMSG;
            }
        },
        login: async(_, args, ctx) => {
            try {
                const { username, password } = args;
                let user = await userModels.findOne({
                    $or: [{ username }, { email: args.username }],
                });
                if (user) {
                    let check = bcrypt.compare(password, user.password);
                    if (check) {
                        token = getToken(user.username, user.email);

                        return { token };
                    }
                }
                return { token: "error user not found" };
            } catch (error) {
                return error;
            }
        },
        addMessage: async(_, args, ctx) => {
            try {
                let verified = tokenChecker(ctx);
                const { username, email } = verified;
                let userT = await userModels.findOne({ username, email });
                if (userT) {
                    let response = new chatModel({ message: args.message });
                    let data = await response.save();
                    pubsub.publish("chatTopic", {
                        chat: data,
                    });

                    return data;
                }
            } catch (error) {
                return error;
            }
        },
    },
};