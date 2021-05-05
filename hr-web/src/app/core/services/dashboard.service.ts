import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { user } from '../models/user.model';

const routes = {
  eligibilityUrl: environment.authenticationUrl,
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Returns the full eligibility of patient.
   * @param context The eligibility parameters.
   * @return The patient eligibility.
   */
  getEmployees(): Observable<user> {
      debugger
    return this.httpClient.get(`${routes.eligibilityUrl}/user/all`).pipe(
      map((result: any) => result),
      catchError((err: any) => {
        console.log('Error while getting list of employees : ', err);
        return of(`${err.status}`);
      })
    );
  }
}
