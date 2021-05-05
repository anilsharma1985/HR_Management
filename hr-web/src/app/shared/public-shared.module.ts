import { NgModule } from '@angular/core';
import { HeaderPublicComponent } from './components/header-public/header-public.component';
import { FooterPublicComponent } from './components/footer-public/footer-public.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthenticationSidebarComponent } from './components/authentication/authentication-sidebar/authentication-sidebar.component';
import { AuthenticationMidbarComponent } from './components/authentication/authentication-midbar/authentication-midbar.component';

@NgModule({
  imports: [AngularMaterialModule],
  declarations: [HeaderPublicComponent, FooterPublicComponent, AuthenticationSidebarComponent, AuthenticationMidbarComponent],
  exports: [HeaderPublicComponent, FooterPublicComponent,AuthenticationSidebarComponent, AuthenticationMidbarComponent],
})
export class PublicSharedModule {}
