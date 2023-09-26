import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bidder } from './bid/bidder.model';
import { BidderService } from './bid/bidder.service';
import { Bid } from './bid/bid.model';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bidder: Bidder = new Bidder();
  loggedinuser: string = '';
  public isHandset$: Observable<boolean> = this.observer
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  title = 'auction';


  constructor(private router: Router, private bidderService: BidderService, private observer: BreakpointObserver, private dialog: MatDialog) {

  }


  showSearchForm = false;

  ngOnInit() {
    var loggedinbidder = JSON.parse(localStorage.getItem('bidder') || '{}');
    this.loggedinuser = loggedinbidder.fname;
    // this.getBidder(loggedinbidder.id);
    // localStorage.getItem('bidder', JSON.stringify(this.bidder))
  }
  toggleSearch() {
    this.showSearchForm = !this.showSearchForm;
  }


  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {

    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      // this.ngOnInit();
    });
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token !== null && token !== undefined) {
      return true;
    }
    else { return false }
  };


  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // getBidder(bidderid: number) {
  //   this.bidderService.getBidder(bidderid).subscribe((bidder: Bidder) => {
  //     this.bidder = bidder;
  //     console.log(this.bidder);
  //   },
  //     (error) => {
  //       console.error('Error fetching user:', error);
  //     })
  // }


}
