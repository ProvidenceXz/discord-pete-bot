import { Message } from "discord.js"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"

import { Action } from "../interfaces"
import { Stickers } from "../services/stickers"

@injectable()
export class Greet implements Action {
    /*
     * starter command Class
     */
    name: string = 'hi'
    description: string = 'Pete was being greeted.'
    reaction: string = 'hi'
    regex: RegExp = /hi\b|hello\b/i

    private stickers: Stickers

    constructor(
        @inject(TYPES.Stickers) stickers: Stickers
    ) {
        this.stickers = stickers
    }
    
    public execute(message: Message): Promise<Message | Message[]> {
        return message.reply("helo!", { files: [this.stickers.hi()] })
    }

    public is(s: string): boolean {
        return s.search(this.regex) >= 0
    }
}
