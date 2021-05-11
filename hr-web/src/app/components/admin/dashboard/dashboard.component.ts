import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private users$: any;
  public allusers: any[];

  constructor(private dashboardService: DashboardService) {
    debugger;
  }
  loadUser(page: number, limit: number) {
    debugger
    this.users$ = this.dashboardService
      .getEmployees(page, limit)
      .pipe(
        finalize(() => {
          // this.loginForm.markAsPristine();
          // this.isLoading = false;
        })
        // untilDestroyed(this)
      )
      .subscribe(
        (user: any) => {
          debugger;
          this.allusers = user;
          // log.debug(`${credentials.usernameOrEmail} successfully logged in`);
          // this.authenticationService.setIsNextStep(true);
          // RouteProtect.isNextStep = true;
          // this.router.navigateByUrl('/dashboard');
        },
        (error: any) => {
          // log.debug(`Login error: ${error.message}`);
          // this.error = error;
        }
      );
  }
  loadPaging(event) {
    debugger;
    this.loadUser(event.page, event.itemsPerPage);
  }
  ngOnInit(): void {}
}
