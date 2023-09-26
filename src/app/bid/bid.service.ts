import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Bid } from './bid.model';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private apiUrl = `${environment.urlAddress}/bid`; // Change this to your API URL

  constructor(private http: HttpClient) { }

  getBids(): Observable<Bid> {
    return this.http.get<Bid>(`${this.apiUrl}`);
  }

  getBid(id: number): Observable<Bid> {
    return this.http.get<Bid>(`${this.apiUrl}/${id}`);
  }

  createBid(bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(`${this.apiUrl}`, bid);
  }

  updateBid(id: number, bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(`${this.apiUrl}/${id}`, bid);
  }

  deleteBid(bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(`${this.apiUrl}/deletebid`, bid);
  }
}
