import { Vehicle } from "../product-overview/vehicle.model";
import { Bid } from "./bid.model";
import { Bidder } from "./bidder.model";

export class BidDetails {
    id: number;
    bid: Bid;
    bidId: number;
    vehicle: Vehicle;
    vehicleId: number;
    bidder: Bidder;
    bidderId: number;
    staffid: number;
    staffBid: number;
    bidDate: Date;


    constructor() {
        this.id = 0;
        this.bid = new Bid();
        this.bidId = 0;
        this.vehicle = new Vehicle();
        this.vehicleId = 0;
        this.bidder = new Bidder();
        this.bidderId = 0;
        this.staffid = 0;
        this.staffBid = 0;
        this.bidDate = new Date();

    }

}
