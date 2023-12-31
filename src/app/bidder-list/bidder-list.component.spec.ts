import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderListComponent } from './bidder-list.component';

describe('BidderListComponent', () => {
  let component: BidderListComponent;
  let fixture: ComponentFixture<BidderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidderListComponent]
    });
    fixture = TestBed.createComponent(BidderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
