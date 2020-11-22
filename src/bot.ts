import { Client, Message } from "discord.js"
import { inject, injectable } from "inversify"
import { TYPES } from "./types"
import { CommandHandler } from "./services/command-handler"
import * as config from "./config.json"

@injectable()
export class Bot {
    private client: Client
    private readonly token: string
    private commandHandler: CommandHandler

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.CommandHandler) commandHandler: CommandHandler
    ) {
        this.client = client
        this.token = token
        this.commandHandler = commandHandler
    }

    public listen(): Promise<string> {
        this.client.on('message', (message: Message) => {
            if (!message.content.startsWith(config.prefix) || message.author.bot) {
                return
            }

            console.log("Someone says to Pete: ", message.content)

            this.commandHandler.handle(message).then(() => {
                console.log("Pete replies!")
            }).catch(() => {
                console.log("Pete didn't reply.")
            })
        });

        return this.client.login(this.token)
    }
}
