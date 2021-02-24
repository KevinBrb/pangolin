import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pangolin-app';
  loggedName = '';
  retrievedInfos: any;
  id: any;
  pangolin: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.retrievedInfos = JSON.parse(localStorage.getItem('currentUser')!);
    this.loggedName = this.retrievedInfos.login;
    this.id = this.retrievedInfos._id;
  }

  logout(): void {
    this.authService.doLogout();
  }
}
