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

  constructor(public authService: AuthService) { 
    this.retrievedInfos = JSON.parse(localStorage.getItem('currentUser')!);
    if(this.authService.isLoggedIn) {      
      this.loggedName = this.retrievedInfos.login;
    } else {
      this.loggedName = '';
    }
  }

  ngOnInit(): void {
    if(this.retrievedInfos !== null){
      this.id = this.retrievedInfos._id;
    }
  }

  logout(): void {
    this.authService.doLogout();
  }
}
