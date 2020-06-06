import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { AuthResponseData } from './auth.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Subject Dont send initial value, dont expects initial value 
  // BehaviorSub send initial value, always expected initial argument 
  user = new BehaviorSubject<User>(null);   // First user is null. After login user has value

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoYZIaRV-0fDR3L8E74Ahpj_ziRkhs-Bs',
    {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    })
    )};

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoYZIaRV-0fDR3L8E74Ahpj_ziRkhs-Bs',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
      const user = new User(
        email,
        userId,
        token,
        expirationDate
      );
      this.user.next(user);
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
