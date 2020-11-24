import "reflect-metadata"
import { Container } from "inversify"
import { TYPES } from "./types"
import { Bot } from "./bot"
import { Client } from "discord.js"
import { CommandHandler } from "./services/command-handler"
import { Help, Greet, Pet } from "./commands/"
import { ActionManager } from "./services/action-manager"
import { Stickers } from "./services/stickers"


let container = new Container()

container.bind<Client>(TYPES.Client).toConstantValue(new Client())
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN)

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope()
container.bind<CommandHandler>(TYPES.CommandHandler).to(CommandHandler).inSingletonScope()
container.bind<ActionManager>(TYPES.ActionManager).to(ActionManager).inSingletonScope()
container.bind<Stickers>(TYPES.Stickers).to(Stickers).inSingletonScope()
container.bind<Help>(TYPES.Help).to(Help).inSingletonScope()
container.bind<Greet>(TYPES.Greet).to(Greet).inSingletonScope()
container.bind<Pet>(TYPES.Pet).to(Pet).inSingletonScope()

export default container
