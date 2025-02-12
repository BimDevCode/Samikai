import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorGeneratorService {
  constructor() { }

  simulateClientError(): void {
    throw new Error('This is a client-side error!');
  }

  simulateServerError(): Observable<never> {
    return throwError({ status: 500, message: 'This is a server-side error!' });
  }
}