import { Bid } from "../bid/bid.model";

export class Vehicle {
    id: number;
    name: string;
    yOM: string;
    exteriorColor: string;
    interiorColor: string;
    engineType: string;
    transmission: string;
    fuelType: string;
    vIN: string;
    coolingSystem: string;
    bodyWorks: boolean;
    gearBoxState: boolean;
    engine: string;
    suspension: string;
    bidid: number;
    bid: Bid;
    // imageUrl: string;


    constructor() {
        this.id = 0;
        this.name = '';
        this.yOM = '';
        this.exteriorColor = '';
        this.interiorColor = '';
        this.engineType = '';
        this.transmission = '';
        this.fuelType = '';
        this.vIN = '';
        this.coolingSystem = '';
        this.bodyWorks = false;
        this.gearBoxState = false;
        this.engine = '';
        this.suspension = '';
        this.bidid = 0;
        this.bid = new Bid();
    }

}
