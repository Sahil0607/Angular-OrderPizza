import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { AuthResponseData } from './auth.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoYZIaRV-0fDR3L8E74Ahpj_ziRkhs-Bs',
    {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
    };

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoYZIaRV-0fDR3L8E74Ahpj_ziRkhs-Bs',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError));
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occured!';

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exist already!';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Operation not allowed';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Too many attempts try later';
          break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct';
          break;
          case 'USER_DISABLED':
            errorMessage = 'Disabled!!';
          break;
      };
      return throwError(errorMessage);
  }
}
