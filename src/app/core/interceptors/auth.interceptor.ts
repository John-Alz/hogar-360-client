import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  private mixedEndpoints = [
    '/api/v1/category',
    '/api/v1/location',
    '/api/v1/user',
  ];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const isMixedEdnpoint = this.mixedEndpoints.some(endpoint => {
      request.url.includes(endpoint);
    });

    if(isMixedEdnpoint) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');

    if (token) {;

      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
