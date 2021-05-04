import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
// import { Logger } from '../logger.service';
import { CredentialsService } from '../services/credentials.service';

// const log = new Logger('AuthInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
      debugger
    try {
      if (!request.url.includes('users/authenticate')) {
        const token = await this.credentialsService.credentials.token;
        let changedRequest = request;
        // HttpHeader object immutable - copy values
        const headerSettings: { [name: string]: string | string[] } = {};

        for (const key of request.headers.keys()) {
          headerSettings[key] = request.headers.getAll(key);
        }
        if (token) {
          // tslint:disable-next-line: no-string-literal
          headerSettings['Authorization'] = 'Bearer ' + token;
        }
        // headerSettings['Content-Type'] = 'multipart/form-data';
        const newHeader = new HttpHeaders(headerSettings);

        changedRequest = request.clone({
          headers: newHeader,
        });
        return next.handle(changedRequest).toPromise();
      } else {
        return next.handle(request).toPromise();
      }
    } catch (error) {
      console.log(`Error was : ${error}`);
      return next.handle(request).toPromise();
    }
  }
}
