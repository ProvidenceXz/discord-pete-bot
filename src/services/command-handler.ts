import { Message } from "discord.js"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"
import * as config from "../config.json"

import { Stickers } from "./stickers"
import { ActionManager } from "./action-manager"

@injectable()
export class CommandHandler {
    private actionManager: ActionManager
    private stickers: Stickers

    constructor(
        @inject(TYPES.ActionManager) actionManager: ActionManager,
        @inject(TYPES.Stickers) stickers: Stickers
    ) {
        this.actionManager = actionManager
        this.stickers = stickers
    }

    handle(message: Message): Promise<Message | Message[]> {
        // remove prefix
        const cmd: string = message.content.slice(config.prefix.length).trim()

        let action: string
        if (action = this.actionManager.getAction(cmd)) {
            return this.actionManager.execute(message, action, cmd)
        }

        return Promise.reject()
    }
}
