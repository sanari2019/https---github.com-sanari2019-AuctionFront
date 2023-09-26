import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleImage } from './vehicleimage.model';
import { environment } from 'environments/environment';
import { Vehicle } from './vehicle.model';
// import { Vehicle } from './vehicle.model';

@Injectable({
    providedIn: 'root'
})
export class VehicleImageService {

    private baseUrl = `${environment.urlAddress}/vehicleimage`;; // Replace with your API base URL


    constructor(private http: HttpClient) { }

    getVehicleImages(): Observable<VehicleImage[]> {
        return this.http.get<VehicleImage[]>(`${this.baseUrl}`);
    }
    getDefaultImages(): Observable<VehicleImage[]> {
        return this.http.get<VehicleImage[]>(`${this.baseUrl}/default`);
    }

    getImagesByVehicleId(vehicleId: number): Observable<VehicleImage[]> {
        return this.http.get<VehicleImage[]>(`${this.baseUrl}/${vehicleId}`);
    }

    updateVehicleImage(id: number, vehicleImage: VehicleImage): Observable<VehicleImage> {
        return this.http.post<VehicleImage>(`${this.baseUrl}/${id}`, vehicleImage);
    }

    insertVehicleImage(vehicleImage: VehicleImage): Observable<VehicleImage> {
        return this.http.post<VehicleImage>(`${this.baseUrl}`, vehicleImage);
    }

    deleteVehicleImage(vehicleImage: VehicleImage): Observable<VehicleImage> {
        return this.http.post<VehicleImage>(`${this.baseUrl}/deletevehicleImage`, vehicleImage);
    }
}
