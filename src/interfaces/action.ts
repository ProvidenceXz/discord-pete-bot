import { Command } from "./command"

export interface Action extends Command {
    description: string
    reaction: string
}
