import { Message } from "discord.js"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"
import * as config from "../config.json"

import { Stickers } from "./stickers"
import { ActionManager } from "./action-manager"

import { Help } from "../commands"

@injectable()
export class CommandHandler {
    private actionManager: ActionManager
    private stickers: Stickers

    private help: Help

    constructor(
        @inject(TYPES.Help) help: Help,
        @inject(TYPES.ActionManager) actionManager: ActionManager,
        @inject(TYPES.Stickers) stickers: Stickers
    ) {
        this.actionManager = actionManager
        this.stickers = stickers

        this.help = help
    }

    handle(message: Message): Promise<void | Message | Message[]> {
        // remove prefix
        const cmd: string = message.content.slice(config.prefix.length).trim()

        if (this.help.is(cmd)) {
            return this.help.execute(message)
        }

        // TODO: try except
        let a: string
        if (a = this.actionManager.getActionName(cmd)) {
            return this.actionManager.execute(message, a)
        }

        return Promise.reject()
    }
}
