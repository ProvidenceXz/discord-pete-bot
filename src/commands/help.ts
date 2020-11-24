import { Message } from "discord.js"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"

import { Command } from "../interfaces"
import { ActionManager } from "../services"

@injectable()
export class Help implements Command {
    /*
     * starter command Class
     */
    name: string = 'help'
    regex: RegExp = /help\b/i

    private actionManager: ActionManager

    constructor(
        @inject(TYPES.ActionManager) actionManager: ActionManager
    ) {
        this.actionManager = actionManager
    }

    public async execute(message: Message): Promise<void | Message | Message[]> {
        const actions: string[] = this.actionManager.getActionNames()
        const response: string[] = []

        response.push("Here are some words I know...")
        response.push(actions.join(', '))

        try {
            await message.author.send(response, { split: true })
            if (message.channel.type === 'dm')
                return
            message.reply("I\'ve sent you a DM!")
        } catch (error) {
            console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
            message.reply("Do you have DMs disabled?")
        }
    }

    public is(s: string): boolean {
        return s.search(this.regex) >= 0
    }
}
