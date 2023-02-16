import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalstorageService } from '../Shared/Service/localstorage.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private lsServ: LocalstorageService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.lsServ.getItem('accountid');
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    accountid: currentUser
                }
            });
        }

        return next.handle(request);
    }

}
