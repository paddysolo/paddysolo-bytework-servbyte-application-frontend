import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiMethod } from '../constants/apiconstants';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }

  makeApiCall(api:String,method:ApiMethod,data?:any) {
    let response;
    switch (method) {
      case ApiMethod.GET:
        response = this._http.get(`${environment.baseUrl}${api}`)
          .pipe(catchError(async (err) => this.handleError(err, this)));
        break;
      
      case ApiMethod.POST:
        response = this._http.post(`${environment.baseUrl}${api}`,data)
          .pipe(catchError(async (err) => this.handleError(err, this)));
        break;
      
      case ApiMethod.PUT:
        response = this._http.put(`${environment.baseUrl}${api}`,data)
          .pipe(catchError(async (err) => this.handleError(err, this)));
        break;
      
      case ApiMethod.DELETE:
        response = this._http.delete(`${environment.baseUrl}${api}`)
          .pipe(catchError(async (err) => this.handleError(err, this)));
        break;
    }

    return response;
  }

  private handleError(error:HttpErrorResponse,self) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred !!', error.error.message);
    } else {
      // this._error.whichError(error.status, error.message);
      return throwError({ error: error.message, status: error.status });
    }
  }
}
