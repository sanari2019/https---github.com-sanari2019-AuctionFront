import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Bidder } from './bidder.model';
import { AuthenticatedResponse } from '../login/authenticatedresponse.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidderService {
  private baseUrl = `${environment.urlAddress}/Bidder`;

  constructor(private http: HttpClient) { }

  getBidders(): Observable<Bidder[]> {
    return this.http.get<Bidder[]>(`${this.baseUrl}`);
  }

  getBidder(id: number): Observable<Bidder> {
    return this.http.get<Bidder>(`${this.baseUrl}/${id}`);
  }

  getBidderByUsername(username: string): Observable<Bidder> {
    return this.http.get<Bidder>(`${this.baseUrl}/getuser/${username}`);
  }

  login(bidder: Bidder): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>(`${this.baseUrl}/login`, bidder);
  }

  deleteBidder(bidder: Bidder): Observable<Bidder> {
    return this.http.post<Bidder>(`${this.baseUrl}/deleteuser`, bidder);
  }
  updateBidder(bidder: Bidder): Observable<void> {
    const url = `${this.baseUrl}/${bidder.id}`; // Use this.baseUrl for the API URL
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .put(url, bidder, { headers })
      .pipe(
        map(() => { }),
        catchError((error) => {
          console.error('Error updating bidder:', error);
          return throwError(error);
        })
      );
  }
}
