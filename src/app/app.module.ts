import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { BidComponent } from './bid/bid.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BidderListComponent } from './bidder-list/bidder-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxCarouselModule } from 'ngx-light-carousel';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';




@NgModule({
  declarations: [
    AppComponent,
    BidComponent,
    ProductOverviewComponent,
    LoginComponent,
    BidderListComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    NgImageSliderModule,
    NgxCarouselModule,
    NgxGalleryModule,
    GalleryModule,
    CommonModule,
    CarouselModule,
    SlickCarouselModule

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
