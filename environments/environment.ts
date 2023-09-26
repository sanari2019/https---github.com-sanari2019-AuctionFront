// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlAddress: "https://localhost:7118",
  // urlAddress: "https://bidwiseback.evercare.ng:8080",
  // urlAddress: 'http://10.20.20.104:4040',
  urlAddress: 'http://10.20.20.105:8080',
  angularCipherKeyIvPhrase: '0123456789abcdef|0123456789abcdef'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
