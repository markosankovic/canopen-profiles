import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Profile } from './profile';

@Component({
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  profile: Profile;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
    });
  }

  profileObjectSelected(profileObject) {
    this.router.navigate(['objects', profileObject.objectDescription.index], { relativeTo: this.route });
  }
}
