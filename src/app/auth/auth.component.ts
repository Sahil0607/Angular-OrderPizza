import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../model/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error:string = null;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return 
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
        authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signUp(form.value.email, form.value.password);
    }

    authObs.subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['/menu']);
    },
    errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
    });

    form.reset();
  }
}
