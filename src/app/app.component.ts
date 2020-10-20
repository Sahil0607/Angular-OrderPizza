import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}

// Things to do
// 0. Take menu-list out of folder
// 1. Make each module for each component
// 2. Add lazy load module with new way.
// 3. Add Universal Angular
// 4. Add username in signup so populate home page
// 5. change name completed to orderCompleted in checkout
// 6. Put toaster in common component then load this component when needed (Use switch for all cases)
