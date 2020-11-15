import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { Client } from "discord.js";
import { CommandHandler } from "./services/command-handler";
import { Greetings } from "./services/greetings";
import { Actions } from "./services/actions";
import { Stickers } from "./services/stickers";


let container = new Container();

container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<CommandHandler>(TYPES.CommandHandler).to(CommandHandler).inSingletonScope();
container.bind<Greetings>(TYPES.Greetings).to(Greetings).inSingletonScope();
container.bind<Actions>(TYPES.Actions).to(Actions).inSingletonScope();
container.bind<Stickers>(TYPES.Stickers).to(Stickers).inSingletonScope();

export default container;