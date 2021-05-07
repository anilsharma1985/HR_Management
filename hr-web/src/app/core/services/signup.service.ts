import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { user } from '../models/user.model';

const routes = {
  apiEndpoint: environment.authenticationUrl,
};

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private httpClient: HttpClient) {}

  signup(request: user): Observable<boolean> {
    debugger;
    return this.httpClient
      .post(`${routes.apiEndpoint}/user/signup`, {
        FirstName: request.firstname,
        LastName: request.lastname,
        Email: request.Email,
      })
      .pipe(
        map((result: any) => result),
        catchError((err: any) => {
          console.log('Error while creating signup : ', err);
          return of(`${err.status}`);
        })
      );
  }
}
