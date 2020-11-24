import { Message } from "discord.js"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"

import { Command } from "../interfaces"
import { Stickers } from "../services/stickers"

@injectable()
export class Help implements Command {
    /*
     * starter command Class
     */
    name: string = 'help'
    regex: RegExp = /help\b/i

    private stickers: Stickers

    constructor(
        @inject(TYPES.Stickers) stickers: Stickers
    ) {
        this.stickers = stickers
    }
    
    public execute(message: Message, cmd: string): Promise<Message | Message[]> {
        return message.reply("I know a few words...\nhi\npet")
    }

    public is(s: string): boolean {
        return s.search(this.regex) >= 0
    }
}
