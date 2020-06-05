import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error:string = null;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return 
    }

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;
    if (this.isLoginMode) {
        authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signUp(form.value.email, form.value.password);
    }

    authObs.subscribe(response => {
      this.isLoading = false;
      console.log(response);
    },
    errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
    });

    form.reset();
  }
}
