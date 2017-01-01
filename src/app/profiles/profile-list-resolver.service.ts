import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileListResolver implements Resolve<Profile[]> {
  constructor(private profileService: ProfileService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Profile[]> {
    let profileSeries = route.params['series'];

    return this.profileService.getProfiles().toPromise().then(profiles => {
      if (profiles) {
        return profiles;
      } else {
        this.router.navigate(['/']);
        return null;
      }
    });
  }
}
