import { Vehicle } from "./vehicle.model";

export class VehicleImage {
    id: number;
    vehicle: Vehicle;
    vehicleId: number;
    imageUrl: string;
    defaultImage: boolean;
    public countdown?: { days: number; hours: number; minutes: number; seconds: number };

    constructor() {
        this.id = 0;
        this.vehicle = new Vehicle();
        this.vehicleId = 0;
        this.imageUrl = '';
        this.defaultImage = false;
    }
}
