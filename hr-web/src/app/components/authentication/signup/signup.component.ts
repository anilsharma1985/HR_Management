import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  loginForm = this.initForm();

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {}
  onSubmit() {}
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };
  private initForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
