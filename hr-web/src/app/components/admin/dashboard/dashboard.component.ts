import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private users$: any;

  constructor(private employeeService: EmployeeService) {
    debugger
    this.users$ = this.employeeService
    .getFullEligibility()
    .pipe(
      finalize(() => {
        // this.loginForm.markAsPristine();
        // this.isLoading = false;
      }),
      // untilDestroyed(this)
    )
    .subscribe(
      (credentials: any) => {
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

  ngOnInit(): void {}
}
