import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProfileObject } from './profile';

@Component({
  templateUrl: './profile-object-detail.component.html',
  styleUrls: ['./profile-object-detail.component.css']
})
export class ProfileObjectDetailComponent implements OnInit {

  profileObject: ProfileObject;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { profileObject: ProfileObject }) => {
      this.profileObject = data.profileObject;
    });
  }
}
