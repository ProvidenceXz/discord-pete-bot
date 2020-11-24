import { Message } from "discord.js"

export interface Command {
    name: string
    regex: RegExp

    execute(message: Message): Promise<void | Message | Message[]>
    is(s: string): boolean
}
