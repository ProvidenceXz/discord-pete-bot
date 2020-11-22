import { Message } from "discord.js"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"

import { Action } from "../interfaces"
import { Stickers } from "../services/stickers"

@injectable()
export class Pet implements Action {
    /*
     * starter command Class
     */
    name: string = 'pet'
    description: string = 'Pete was petted.'
    reaction: string = 'happy'
    regex: RegExp = /pet\b/i

    private stickers: Stickers

    constructor(
        @inject(TYPES.Stickers) stickers: Stickers
    ) {
        this.stickers = stickers
    }
    
    public execute(message: Message, cmd: string): Promise<Message | Message[]> {
        if (message.author.username == "CyanX") {
            return message.reply("*Cyan petted himself.. how?*", { files: [this.stickers.selfPet()] })
        }
        return message.reply("*happy noises*", { files: [this.stickers.happy()] })
    }

    public is(s: string): boolean {
        return s.search(this.regex) >= 0
    }
}