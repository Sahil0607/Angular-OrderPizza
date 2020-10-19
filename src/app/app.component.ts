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
