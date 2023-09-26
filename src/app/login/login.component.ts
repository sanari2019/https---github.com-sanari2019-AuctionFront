import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Bidder } from '../bid/bidder.model';
import { BidderService } from '../bid/bidder.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'environments/environment';
import { AuthenticatedResponse } from './authenticatedresponse.model';
import { Router, Route, } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bid } from '../bid/bid.model';
// import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  bidder: Bidder = new Bidder();
  invalidLogin!: boolean;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder, private router: Router, private bidderService: BidderService) {
    this.form = new FormGroup({
      userName: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInIt(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


  }
  onSubmit() {
    if (this.form.valid) {
      const userName = this.form.value.userName;
      const password = this.form.value.password;

      this.bidder.username = userName;
      // this.bidder.password = password;

      // Encrypt the password using your encryption method
      const encryptedPassword = this.encrypt(password);
      this.bidder.password = encryptedPassword;

      // Call the login method in your service
      this.bidderService.login(this.bidder)
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            if (token !== undefined) {
              localStorage.setItem("jwt", token);
              this.bidder.lLoginDate = new Date();
              this.invalidLogin = false;
              this.dialogRef.close();
              this.router.navigate(["/"]);
              this.getBidderbyUsername(this.bidder.username)
              // localStorage.setItem('bidder', JSON.stringify())
            } else {
              // Handle the case where the token is undefined
              // For example, display an error message or redirect to an error page
              console.error("Token is undefined");
            }
          },
          error: (err: HttpErrorResponse) => this.invalidLogin = true
        })
    }
  }

  encrypt(plainText: string): string {
    let cipherPhrase = environment.angularCipherKeyIvPhrase;

    // Separate the key and IV from the cipher phrase string
    var key = CryptoJS.enc.Utf8.parse(cipherPhrase.split("|")[0]);
    var iv = CryptoJS.enc.Utf8.parse(cipherPhrase.split("|")[1]);

    // Encrypt using AES algorithm
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainText),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    // Convert encrypted data to a string and return
    return encrypted.toString();
  }
  getBidderbyUsername(bidderuser: string) {
    this.bidderService.getBidderByUsername(bidderuser).subscribe((bidder: Bidder) => {
      this.bidder = bidder;
      localStorage.setItem('bidder', JSON.stringify(this.bidder))
    })
  }

  updateBidder() {

  }


}
