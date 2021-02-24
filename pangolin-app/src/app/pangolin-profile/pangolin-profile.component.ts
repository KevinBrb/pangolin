import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pangolin-profile',
  templateUrl: './pangolin-profile.component.html',
  styleUrls: ['./pangolin-profile.component.scss']
})
export class PangolinProfileComponent implements OnInit {

  currentUser: any;
  id: any;
  retrievedInfos: any;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.retrievedInfos = JSON.parse(localStorage.getItem('currentUser')!)
    this.id = this.retrievedInfos._id
    
    
    this.getMyAccount();
  }

  ngOnInit(): void {
  }

  

  getMyAccount(): void {
    this.authService.getMyAccount(this.id).subscribe(
      data => {
        this.currentUser = data.body;
        this.currentUser.friends = this.currentUser.friends.length;
      },
      error => {
        console.log(error);
      });
  }

}

