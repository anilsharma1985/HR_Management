import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { PublicModule } from './components/public/public.module';
import { PublicSharedModule } from './shared/public-shared.module';
import { AdminModule } from './components/admin/admin.module';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';
import { PublicContainerComponent } from './containers/public-container/public-container.component';

@NgModule({
  declarations: [AppComponent, AdminContainerComponent, AuthContainerComponent, PublicContainerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    PublicSharedModule,
    PublicModule,
    AdminModule,
    AuthenticationModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
