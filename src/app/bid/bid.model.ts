export class Bid {
    id: number;
    startTime: Date;
    endTime: Date;
    minBid: number;
    bidName: string;

    constructor() {
        this.id = 0;
        this.startTime = new Date();
        this.endTime = new Date();
        this.minBid = 0;
        this.bidName = '';
    }
}
