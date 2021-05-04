import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  loginForm = this.initForm();
  private login$: any;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

 
  onSubmit() {
    debugger
     // stop here if form is invalid
     if (this.loginForm.invalid) {
      return;
    }
    // success part
    this.login$ = this.authenticationService
    .login(this.loginForm.value)
    .pipe(
      finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }),
      // untilDestroyed(this)
    )
    .subscribe(
      (credentials: any) => {
        this.router.navigateByUrl('/dashboard');
      },
      (error: any) => {
        // this.error = error;
      }
    );
  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };

  private initForm() {
    return this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}