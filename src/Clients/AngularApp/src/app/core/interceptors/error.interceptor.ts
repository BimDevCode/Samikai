import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, NavigationStart, Router } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { Warning } from 'postcss';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessageService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.messageService.clear();
      }
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next. handle(request).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this.showWarnToast(error.status.toString(),error.error.message)
            }
          }
          if (error.status === 401) {
            this.showWarnToast(error.status.toString(),error.error.message)
          }
          if (error.status === 404) {
            if (error.url?.includes("api/articles/")){
              return throwError(() => new Warning('Not Exist Article'));
            }
            this.router.navigateByUrl('/notfound');
            this.showWarnToast(error.status.toString(),error.error.message)
          };
          if (error.status === 500) {
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            this.router.navigateByUrl('/notfound', navigationExtras);
            this.showWarnToast(error.status.toString(),error.error.message)
          }
          else{
            this.showWarnToast(error.status.toString(),error.error.message)
            return throwError(() => new Warning(error.error.message));
          }
        }
        return throwError(() => new Error(error.error.message))
      })
    )
  }
  showWarnToast(title: string, content: string) {
    this.messageService.add({ key: 'prod', severity: 'warn', summary: title, detail: content });
  }
  errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req);
  };
}


