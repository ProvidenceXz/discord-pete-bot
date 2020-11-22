require('dotenv').config(); // Recommended way of loading dotenv
import container from "./inversify.config";
import { TYPES } from "./types";
import { Bot } from "./bot";

let bot = container.get<Bot>(TYPES.Bot);

bot.listen().then(() => {
    console.log('Pete wakes up.')
}).catch((error) => {
    console.log('Something is wrong with Pete!!', error)
});