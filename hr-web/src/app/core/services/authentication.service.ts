import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Credentials, CredentialsService } from './credentials.service';
import { map, finalize, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface LoginContext {
  userName: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    debugger
    let data: Credentials = null;
    return this.http
      .post<any>(`${environment.authenticationUrl}/user/Authenticate`, {
        usernameOrEmail: context.userName,
        password: context.password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in storage to keep user logged in between page refreshes
            data = {
              usernameOrEmail: context.userName,
              token: user.token,
              userId: user.id,
            };
            this.credentialsService.setCredentials(data, context.remember);
          }

          return user;
        }),
        finalize(() => {
          return of(data);
        })
      );
  }


  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    debugger
    // Customize credentials invalidation here
    this.credentialsService.setCredentials(null);
    this.credentialsService.setIsNextStep(null);
    return of(true);
  }

 
}
