import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {  RouterModule } from '@angular/router';
import { AuthInterceptor } from './http/authentication.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { ConfigService } from './api/config.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
   
    // ConfigService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (config: ConfigService) => () => config.load(),
    //   deps: [ConfigService],
    //   multi: true,
    // },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
