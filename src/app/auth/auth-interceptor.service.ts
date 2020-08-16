import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  // Interceptor is middleware. When send or receive req. it will pass through this service.

  constructor(private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      // exhaustMap will wait to execute first observable then it will execute
      // take will take only 1 output then unsubscribe
      if (!user) {
        return next.handle(req);   // Not add token if user not available (for signin and signup)
      }

      // Add Auth token for outgoing request
      const modifiedReq = req.clone({
        // Authentication we have to add token for backend. Otherwise req. will fail
        // Adding token as request parameter for firebase. Anyother case add it in header
        params: new HttpParams().set('auth', user.token)
      });
      return next.handle(modifiedReq);
    })
    );
  }
}

// Anyother cases(Not firebase) we add token in header Ex: 
// const authReq = req.clone({
//   headers: req.headers.set('Authorization', /* here you fetch your jwt */this.getToken())
//     .append('Access-Control-Allow-Origin', '*')
// }); 
