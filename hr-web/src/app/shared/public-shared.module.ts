import { NgModule } from '@angular/core';
import { HeaderPublicComponent } from './components/header-public/header-public.component';
import { FooterPublicComponent } from './components/footer-public/footer-public.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthenticationSidebarComponent } from './components/authentication/authentication-sidebar/authentication-sidebar.component';
import { AuthenticationMidbarComponent } from './components/authentication/authentication-midbar/authentication-midbar.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';

@NgModule({
  imports: [AngularMaterialModule],
  declarations: [
    HeaderPublicComponent,
    FooterPublicComponent,
    AuthenticationSidebarComponent,
    AuthenticationMidbarComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
  ],
  exports: [
    HeaderPublicComponent,
    FooterPublicComponent,
    AuthenticationSidebarComponent,
    AuthenticationMidbarComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
  ],
})
export class PublicSharedModule {}
