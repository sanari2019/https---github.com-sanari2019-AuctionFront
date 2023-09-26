import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Bidder } from './bidder.model';
import { BidDetails } from './biddetails.model';
import { AuthenticatedResponse } from '../login/authenticatedresponse.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidDetailsService {
  private baseUrl = `${environment.urlAddress}/BidDetails`;

  constructor(private http: HttpClient) { }

  getBidDetails(): Observable<BidDetails[]> {
    return this.http.get<BidDetails[]>(this.baseUrl);
  }

  getBidDetailById(id: number): Observable<BidDetails> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<BidDetails>(url);
  }
  // Example methods for API calls
  getBidDetailsByVehicle(vehicleId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getbiddetails/${vehicleId}`);
  }

  getBidDetailsByBidder(bidderId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getbiddetail/${bidderId}`);
  }
  getLatestBid(staffId: number, vehicleId: number): Observable<BidDetails | null> {
    const url = `${this.baseUrl}/latestBid?staffId=${staffId}&vehicleId=${vehicleId}`;

    return this.http.get<BidDetails | null>(url);
  }


  // createBidDetail(bidDetail: BidDetails): Observable<BidDetails> {
  //   return this.http.post<BidDetails>(this.baseUrl, bidDetail);
  // }
  createBidDetail(bidDetail: BidDetails): Observable<BidDetails> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    bidDetail.id = 0;
    return this.http.post<BidDetails>(this.baseUrl, bidDetail, { headers })
      .pipe(
        tap(data => {
          console.log('createUser: ' + JSON.stringify(data));
          // this.sendRegistrationEmail(data); // Send registration email after successful registration
        }),
        catchError(this.handleError)
      );
  }

  private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage!: string;
    if (err.error && err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status!}: ${err.body?.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  updateBidDetail(id: number, bidDetail: BidDetails): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<void>(url, bidDetail);
  }

  deleteBidDetail(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}