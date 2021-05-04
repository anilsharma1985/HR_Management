import { NgModule } from '@angular/core';
import { HeaderPublicComponent } from './components/header-public/header-public.component';
import { FooterPublicComponent } from './components/footer-public/footer-public.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [AngularMaterialModule],
  declarations: [HeaderPublicComponent, FooterPublicComponent],
  exports: [HeaderPublicComponent, FooterPublicComponent],
})
export class PublicSharedModule {}
