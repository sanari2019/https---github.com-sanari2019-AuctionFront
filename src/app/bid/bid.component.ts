import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../login/login.component';
import { Router, Route, } from '@angular/router';
import { Vehicle } from '../product-overview/vehicle.model';
import { VehicleImage } from '../product-overview/vehicleimage.model';
import { VehicleImageService } from '../product-overview/vehicleImage.service';
import { Bid } from './bid.model';
import { BidService } from './bid.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, observable } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Bidder } from './bidder.model';
import { BidderService } from './bidder.service';


@UntilDestroy()
@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
  constructor(private bidderService: BidderService, private breakpointObserver: BreakpointObserver, private router: Router, private dialog: MatDialog, private vehicleimageService: VehicleImageService, private bidService: BidService,) { }

  vehicle: Vehicle[] = [];
  vehicleImage: VehicleImage[] = [];
  bid: Bid = new Bid();
  countdown: { days: number; hours: number; minutes: number; seconds: number; } | undefined;
  enddate: Date = new Date();
  // private destroy$: Subject<void> = new Subject<void>();
  isHandset: boolean = false;

  private observeHandsetBreakpoint(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(untilDestroyed(this))
      .subscribe((state) => {
        this.isHandset = state.matches;
      });
  }



  ngOnInit(): void {
    this.observeHandsetBreakpoint();
    this.getVehicles();
    // this.enddate.setDate(this.enddate.getDate() + 6);
    // this.startCountdown();
  }

  // startCountdown() {
  //   setInterval(() => {
  //     const currentDate = new Date();
  //     const timeLeft = this.enddate.getTime() - currentDate.getTime();
  //     const days: number = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  //     const hours: number = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes: number = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds: number = Math.floor((timeLeft % (1000 * 60)) / 1000);

  //     this.countdown = { days, hours, minutes, seconds };
  //     this.updatecounter(); // Call the updatecounter method with each interval
  //   }, 1000); // Update the countdown every second
  // }

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

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token !== null && token !== undefined) {
      return true;
    }
    else { return false }
  };

  productnav(car: VehicleImage) {
    const carid = car.vehicleId;
    if (this.isUserAuthenticated()) {

      this.router.navigate(["/product"], { queryParams: { VehicleImage: JSON.stringify(carid) } })
    } else {
      // this.dialogRef.open()
      const dialogRef = this.dialog.open(LoginComponent, {

      });
      dialogRef.afterClosed().subscribe(() => {
        if (this.isUserAuthenticated()) {
          this.router.navigate(["/product"], { queryParams: { VehicleImage: JSON.stringify(carid) } })
        }
      })

    }

  }

  getVehicles() {
    this.vehicleimageService.getDefaultImages().subscribe((veh: VehicleImage[]) => {
      this.vehicleImage = veh;
      this.startCountdown();
    })

  }



  startCountdown() {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      this.vehicleImage.forEach((vehicle) => {
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

            vehicle.countdown = { days, hours, minutes, seconds };
          }
        } else {
          // Time left is not greater than zero, so stop the countdown
          clearInterval(intervalId);
          // You can perform any action you want here when the countdown reaches 00:00:00:00
          console.log('Countdown has ended.');
        }
      });
    }, 1000); // Update the countdown every second
  }

  getBid(vehicle: Vehicle) {
    const bidid = vehicle.bidid;
    if (bidid) {
      this.bidService.getBid(bidid).subscribe((bid: Bid) => {
        vehicle.bid = bid; // Assign the fetched bid to the vehicle's bid property
      });
    }
  }


  // getVehicle(vehicleid:number){
  //   this.vehicleimageService.getImagesByVehicleId(vehicleid).subscribe((vehicle: Vehicle[])=>{
  //     this.vehicle= vehicle;

  //   })
  // }


  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
