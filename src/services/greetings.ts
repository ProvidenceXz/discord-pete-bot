import { injectable } from "inversify";

@injectable()
export class Greetings {
    /**
     * starter command Class
     */
    private r_ping: RegExp = /ping\b/;
    private r_hi: RegExp = /hi\b|hello\b/i

    public isPing(s: string): boolean {
        return s.search(this.r_ping) >= 0;
    }

    public isGreeting(s: string): boolean {
        return s.search(this.r_hi) >= 0;
    }
}