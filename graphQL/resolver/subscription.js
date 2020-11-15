const { pubsub } = require("../helper");
module.exports = {
    Subscription: {
        chat: {
            subscribe() {
                return pubsub.asyncIterator("chatTopic"); //Topic
            },
        },
    },
};