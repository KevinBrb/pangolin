import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pangolins',
  templateUrl: './pangolins.component.html',
  styleUrls: ['./pangolins.component.scss']
})
export class PangolinsComponent implements OnInit {

  pangolins: any;
  loggedName = '';
  retrievedInfos: any;
  id: any;

  constructor (
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.retrievePangolins();
    this.retrievedInfos = JSON.parse(localStorage.getItem('currentUser')!);
    this.loggedName = this.retrievedInfos.login;
    this.id = this.retrievedInfos._id;
  }

  retrievePangolins(): void {
    this.authService.getAll().subscribe(
      data => {
        this.pangolins = data;
        for (const pangolin of this.pangolins) {
          if (pangolin._id === this.id) {
            this.pangolins.splice(this.pangolins.indexOf(pangolin), 1)
          }
        }
      },
      error => {
        console.log(error);
    });
  }
}
