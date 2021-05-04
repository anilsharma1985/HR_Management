// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: true,
  version: '-local',
  serverUrl: '/api',
  authenticationUrl:'http://localhost:24176',
  cstoolboxApiUrl: 'http://localhost:24176',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'es-ES'],

  api: {
    httpCallTimeout: 30000,
    httpCallRetry: 3,
    billingEditApiUrl: 'http://localhost:55839/api',
    cstoolboxApiUrl: 'https://localhost:44304/api',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
