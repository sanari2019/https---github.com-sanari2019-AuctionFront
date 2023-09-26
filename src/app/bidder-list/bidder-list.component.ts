import { Component, OnInit } from '@angular/core';
import { Bidder } from '../bid/bidder.model';
import { BidderService } from '../bid/bidder.service';
import * as jQuery from 'jquery';


@Component({
  selector: 'app-bidder-list',
  templateUrl: './bidder-list.component.html',
  styleUrls: ['./bidder-list.component.scss']
})
export class BidderListComponent implements OnInit {
  bidders: Bidder[] = [];

  constructor(private bidderService: BidderService) { }

  ngOnInit(): void {
    this.fetchBidders();
  }

  fetchBidders(): void {
    this.bidderService.getBidders().subscribe((bidders: Bidder[]) => {
      this.bidders = bidders;
    });
  }


}
