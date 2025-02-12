import { Component } from '@angular/core';
import { ErrorGeneratorService } from '../../core/services/error-generator.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-errors-example',
  templateUrl: './errors-example.component.html',
  styleUrl: './errors-example.component.scss'
})
export class ErrorsExampleComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];
  constructor(private errorGeneratorService: ErrorGeneratorService, private http: HttpClient) {
  }

  testClientError(): void {
    try {
      this.http.get(this.baseUrl + 'products/42').subscribe({
        next: response => console.log(response),
        error: error => console.log(error)
      })
    } catch (error) {
      console.error('Caught client-side error:', error);
    }
  }

  testServerError(): void {
    this.errorGeneratorService.simulateServerError()
      .subscribe(
        () => { },
        error => {
          console.error('Caught server-side error:', error);
        }
      );
  }


  get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    })
  }
}
