import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Profile } from './profile';

@Component({
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  profiles: Profile[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { profiles: Array<Profile> }) => {
      this.profiles = data.profiles;
    });
  }

  onSelect(profile) {
    this.router.navigate([profile.series], { relativeTo: this.route });
  }
}
