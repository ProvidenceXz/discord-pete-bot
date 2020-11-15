import { injectable } from "inversify";

@injectable()
export class Actions {
    /**
     * Class for action related commands
     */
    private r_pet: RegExp = /pet\b/;

    public isAction(s: string): boolean {
        // TODO: generalized matching with more actions
        return s.search(this.r_pet) >= 0;
    }
}
