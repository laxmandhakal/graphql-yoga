const userModels = require("../../model/users");
const chatModel = require("../../model/chat");
module.exports = {
    RootQuery: {
        userList: async() => {
            try {
                const getUser = await userModels.find();
                return getUser;
            } catch (error) {
                return error;
            }
        },
        chat: async() => {
            try {
                const getUser = await chatModel.find();
                return getUser;
            } catch (error) {
                return error;
            }
        },
    },
};