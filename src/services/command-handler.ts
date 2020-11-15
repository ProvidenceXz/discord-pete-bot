import { Message } from "discord.js";
import { Greetings } from "./greetings";
import { Actions } from "./actions";
import { Stickers } from "./stickers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class CommandHandler {
    private greetings: Greetings;
    private actions: Actions;
    private stickers: Stickers;

    constructor(
        @inject(TYPES.Greetings) greetings: Greetings,
        @inject(TYPES.Actions) actions: Actions,
        @inject(TYPES.Stickers) stickers: Stickers
    ) {
        this.greetings = greetings;
        this.actions = actions;
        this.stickers = stickers;
    }

    handle(message: Message): Promise<Message | Message[]> {
        var cmd: string = message.content.replace(/^(!e )/, "")

        //TODO: refactor using module

        if (this.greetings.isPing(cmd)) {
            return message.reply("pong!");
        }

        if (this.greetings.isGreeting(cmd)) {
            return message.reply("helo!", { files: [this.stickers.hi()] });
        }

        if (this.actions.isAction(cmd)) {
            if (message.author.username == "Cyan") {
                // easter egg
                return message.reply("*Cyan petted himself.. how?*", { files: [this.stickers.pet()] });
            }

            var img: string = this.stickers.find(cmd);
            console.log("Sending file: " + img)
            return message.reply("*happy noises*", { files: [img] });
        }

        return Promise.reject();
    }
}