import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';
import { PublicContainerComponent } from './containers/public-container/public-container.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: PublicContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/public/public.module').then(
            (m) => m.PublicModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  // { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'home' },
];

// const routes: Routes = [
//   // Fallback when no prior route is matched
//   { path: '**', redirectTo: '', pathMatch: 'full' },
//   {path:'login', component: PublicContainerComponent, children: [
//     {path:'',loadChildren:()=>import('./components//public/public.module').then(m=>m.PublicModule)}
//   ]},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
