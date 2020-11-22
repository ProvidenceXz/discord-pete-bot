import { injectable } from "inversify"
import * as config from "../config.json"

@injectable()
export class Stickers {
    /**
     * Class for finding approriate stickers and fetching them
     */
    public find(s: string): string {
        // TODO: img search & algo
        return ''
    }
    
    public hi(): string {
        return config.imgDir + '/' + 'hi.png'
    }

    public happy(): string {
        if (Math.random() > 0.5) {
            return config.imgDir + '/' + 'happy.png'
        } else {
            return config.imgDir + '/' + 'happy2.png'
        }
    }

    public selfPet(): string {
        return config.imgDir + '/' + 'pet.png'
    }

}