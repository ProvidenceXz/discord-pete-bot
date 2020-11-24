import { Message, Collection } from "discord.js"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"


import { Greet, Pet } from "../commands"
import { Stickers } from "./stickers"
import { Action } from "../interfaces"

@injectable()
export class ActionManager {
    /**
     * Class for action related commands
     */
    private stickers: Stickers
    private actions: Collection<string, Action>

    constructor(
        @inject(TYPES.Greet) greet: Greet,
        @inject(TYPES.Pet) pet: Pet,
        @inject(TYPES.Stickers) stickers: Stickers
    ) {
        this.stickers = stickers;
        this.actions = new Collection()
        this.actions.set(greet.name, greet)
        this.actions.set(pet.name, pet)
    }

    public getAction(cmd: string): string {
        let action: Action
        for (action of this.actions.values()) {
            if (action.is(cmd)) return action.name
        }
        return ''
    }

    public execute(message: Message, name: string, cmd: string): Promise<Message | Message[]> {
        const action: Action = this.actions.get(name)
        console.log(action.description)
        return action.execute(message, cmd)
    }
}
