import { injectable } from "inversify";
import * as config from ".././config.json"

@injectable()
export class Stickers {
    /**
     * Class for finding approriate stickers and fetching them
     */
    public find(s: string): string {
        // TODO: img search & algo
        var path: string;
        if (Math.random() > 0.5) {
            path = config.imgDir + '/' + 'happy.png';
        } else {
            path = config.imgDir + '/' + 'happy2.png';
        }
        return path;
    }
    
    public hi(): string {
        return config.imgDir + '/' + 'hi.png';
    }

    public pet(): string {
        return config.imgDir + '/' + 'pet.png';
    }

}