import { Message } from "discord.js"

export interface Command {
    name: string
    regex: RegExp

    execute(message: Message, cmd: string): Promise<Message | Message[]>
    is(s: string): boolean
}
