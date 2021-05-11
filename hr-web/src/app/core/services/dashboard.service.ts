import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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

  getEmployees(page: number, limit: number): Observable<user> {
    debugger;
    const opts = {
      params: new HttpParams({ fromString: '_page=1&_limit=2' }),
    };
    // const params = new HttpParams().set('_page', page).set('_limit', limit);

    return this.httpClient
      .get(`${routes.eligibilityUrl}/user/getUser`, {
        params: {
          _page: page.toString(),
          _limit: limit.toString(),
        },
      })
      .pipe(
        map((result: any) => result),
        catchError((err: any) => {
          console.log('Error while getting list of employees : ', err);
          return of(`${err.status}`);
        })
      );
  }
}
