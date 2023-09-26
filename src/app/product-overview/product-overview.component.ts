import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleImageService } from './vehicleImage.service';
import { VehicleImage } from './vehicleimage.model';
import { Vehicle } from './vehicle.model';
import { Bid } from '../bid/bid.model';
import { BidDetails } from '../bid/biddetails.model';
import { Bidder } from '../bid/bidder.model';
import { BidDetailsService } from '../bid/biddetails.service';
import { BidderService } from '../bid/bidder.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { BidService } from '../bid/bid.service';
import { BehaviorSubject, Observable, interval, startWith, Subject, switchMap, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {
  vehicleimage: VehicleImage[] = [];
  // vehimg: VehicleImage = new VehicleImage();
  vehicle: Vehicle = new Vehicle();
  bidder: Bidder = new Bidder();
  bidForm!: FormGroup;
  biddetails: BidDetails = new BidDetails();
  biddetail: BidDetails[] = [];
  isuserAuthenticated = Observable<boolean>;
  bid: Bid = new Bid();
  countdown: { days: number; hours: number; minutes: number; seconds: number; } | undefined;
  countdownInterval: any;
  enddate: Date = new Date();
  private loggedIn = new BehaviorSubject<boolean>(false);
  errorMessage: any;
  currentIndex: number = 0;
  timeoutId?: number;
  imageUrl!: string;
  bidDetailsCount: number = 0;
  staffbid: number = 0;


  constructor(private dialog: MatDialog, private bidService: BidService, private fb: FormBuilder, private bidDetailsService: BidDetailsService, private bidderService: BidderService, private route: ActivatedRoute, private router: Router, private vehicleimageService: VehicleImageService) { }
  changeMainImage(imagePath: string): void {
    const mainImageElement = document.querySelector('.slide') as HTMLImageElement;
    mainImageElement.src = imagePath;
    this.imageUrl = imagePath; //
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      var paramvalue = params['VehicleImage'];



      //   //   this.getUser(paramvalue);
      //   //   // this.loadCartItems();
      this.getvehicleimagebyvehicleid(paramvalue)
      this.getBidDetailsByVehicle(paramvalue);
      console.log(paramvalue);
      var loggedinbidder = JSON.parse(localStorage.getItem('bidder') || '{}');
      this.getLatestBidForStaffAndVehicle(loggedinbidder.id, paramvalue);

    });
    this.bidForm = this.fb.group({
      bid: ['', [Validators.required, Validators.minLength(1)]]
    });


  }
  startCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      const currentDate = new Date();
      this.vehicleimage.forEach((vehicle) => {
        if (vehicle.vehicle?.bid?.endTime) {
          const endTime = new Date(vehicle.vehicle.bid.endTime);
          const timeLeft = endTime.getTime() - currentDate.getTime();
          if (timeLeft > 0) {
            const days: number = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours: number = Math.floor(
              (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes: number = Math.floor(
              (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds: number = Math.floor((timeLeft % (1000 * 60)) / 1000);

            this.countdown = { days, hours, minutes, seconds };
          }
        } else {
          // Time left is not greater than zero, so stop the countdown
          clearInterval(this.countdownInterval);
          // You can perform any action you want here when the countdown reaches 00:00:00:00
          console.log('Countdown has ended.');
        }
      });
    }, 1000); // Update the countdown every second
  }


  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.getCurrentSlideUrl();
  //   }, 0); // Use a minimal delay to ensure the view is initialized.
  // }

  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }
  // resetTimer() {
  //   if (this.timeoutId) {
  //     window.clearTimeout(this.timeoutId);
  //   }
  //   this.timeoutId = window.setTimeout(() => this.goToNext(), 3000);
  // }
  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.vehicleimage.length - 1
      : this.currentIndex - 1;

    // this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.vehicleimage.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    // this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    // this.resetTimer();
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {

    this.imageUrl = this.vehicleimage[this.currentIndex].imageUrl
    return `url('${this.imageUrl}')`;

  }

  getvehicleimagebyvehicleid(vehicleId: number) {
    this.vehicleimageService.getImagesByVehicleId(vehicleId).subscribe((vehi: VehicleImage[]) => {
      // this.vehicleimage = vehi

      this.vehicleimage = vehi
      this.startCountdown();
    })
  }

  getBidderByUsername(username: string) {
    this.bidderService.getBidderByUsername(username).subscribe((bidder: Bidder) => {
      this.bidder = bidder;
      this.bidder.username = bidder.username;
    })
  }

  getBidDetailsByVehicle(vehicleId: number) {
    this.bidDetailsService.getBidDetailsByVehicle(vehicleId).subscribe((biddetail: BidDetails[]) => {
      this.biddetail = biddetail;
      this.bidDetailsCount = biddetail.length;

    })
  }

  getBidDetailsByBidder(bidderId: number) {
    this.bidDetailsService.getBidDetailsByBidder(bidderId).subscribe((biddetail: BidDetails) => {
      if (this.biddetails !== null && this.biddetails !== undefined) {
        this.biddetails = biddetail;
        this.staffbid = biddetail.staffBid;
      } else {
        console.log('No bid details')
      }


    })
  }

  getLatestBidForStaffAndVehicle(staffId: number, vehicleId: number): void {

    this.bidDetailsService.getLatestBid(staffId, vehicleId).subscribe({
      next: (latestBid: BidDetails | null) => {
        if (latestBid) {
          // Handle the case when a bid is found
          this.biddetails = latestBid;
          this.staffbid = latestBid.staffBid;
          console.log('Latest Bid:', latestBid);
        } else {
          // Handle the case when no bid is found
          console.log('No Bid Found');
        }
      },
      error: (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('Error:', error);
      }
    });
  }


  formatWithCommas(value: number | null): string {
    if (value === null) {
      return '';
    }

    const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formatter.format(value);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      // Adjust the width as needed
    });

    // Close the dialog after 2 seconds
    setTimeout(() => {
      dialogRef.close();
      this.ngOnInit();
    }, 2000);
  }

  saveBid(): void {
    const loggedinbidder = localStorage.getItem('bidder') || '{}';
    this.bidder = loggedinbidder !== null ? JSON.parse(loggedinbidder) : new Bidder();
    const staffBid = this.bidForm.get('bid')?.value;
    const staffid = this.bidder.id

    if (this.bidForm.valid) {
      if (this.bidForm.dirty) {
        const p = { ...this.biddetails, ...this.bidForm.value };

        p.staffBid = staffBid;
        p.bid = new Bid();
        p.bidId = this.vehicleimage[0].vehicle.bidid;
        p.vehicleId = this.vehicleimage[0].vehicleId;
        p.vehicle = new Vehicle();
        p.bidderId = this.bidder.id;
        p.bidDate = new Date();
        p.staffid = staffid;
        p.bidder = new Bidder();
        if (confirm(`You are about to gplace a bid of: ${this.formatWithCommas(p.staffBid)}`)) {
          this.bidDetailsService.createBidDetail(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err


            });

        }

      }
    }

  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token !== null && token !== undefined) {

      return true;
    }
    else {

      return false
    }
  };

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  updatecounter() {
    // You can add any specific actions you want to perform during the countdown here.
    // For example, you could display a message when the countdown reaches a certain point.
    if (this.countdown) {
      if (this.countdown.days === 0 && this.countdown.hours === 0 && this.countdown.minutes === 0 && this.countdown.seconds === 0) {
        // Countdown has reached 0, perform an action
        console.log('Countdown has ended.');
      }
    }
  }


  onSaveComplete(): void {
    this.bidForm.reset();
    this.openDialog();
    this.ngOnInit();
  }


}

