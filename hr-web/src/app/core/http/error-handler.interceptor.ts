import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { environment } from '@env/environment';
// import { Logger } from '../logger.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

// const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    debugger
    if (!environment.production) {
      // Do something with the error
    //   log.error('Request error', response);
    }
    const webReponse = response as HttpResponse<any>;
    if (webReponse.status === 401) {
      this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    //   log.info('Rerouting to login');
    }

    throw response;
  }
}
