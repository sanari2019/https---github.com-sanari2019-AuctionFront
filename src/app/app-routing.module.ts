import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidComponent } from './bid/bid.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { LoginComponent } from './login/login.component';
import { BidderListComponent } from './bidder-list/bidder-list.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: BidComponent,
  },
  {
    path: 'product',
    component: ProductOverviewComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'bidders',
    component: BidderListComponent,
  },
  {
    path: 'success',
    component: MyDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
