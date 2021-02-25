import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pangolin-profile',
  templateUrl: './pangolin-profile.component.html',
  styleUrls: ['./pangolin-profile.component.scss']
})
export class PangolinProfileComponent implements OnInit {

  currentProfile: any = {
    login: '',
    description: '',
    age: '',
    food: '',
    race: '',
    species: '',
    friends: ''
  };
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
        this.currentProfile = data.body;
        this.currentProfile.friends = this.currentProfile.friends.length;
      },
      error => {
        console.log(error);
      });
  }

}

