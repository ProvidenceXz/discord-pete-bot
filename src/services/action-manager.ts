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

    public getActionName(cmd: string): string {
        let action: Action
        for (action of this.actions.values()) {
            if (action.is(cmd)) return action.name
        }
        return ''
    }

    public getActionNames(): string[] {
        return Array.from(this.actions.keys())
    }

    public execute(message: Message, actionName: string): Promise<void | Message | Message[]> {
        const action: Action = this.actions.get(actionName)
        console.log(action.description)
        return action.execute(message)
    }
}
