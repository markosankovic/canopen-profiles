import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ProfileObject } from './profile';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileObjectDetailResolver implements Resolve<ProfileObject> {
  constructor(private profileService: ProfileService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ProfileObject> {
    let profileSeries = route.parent.params['series'];
    let profileObjectIndex = route.params['index'];

    return this.profileService.getProfileObject(profileSeries, profileObjectIndex).toPromise().then(profileObject => {
      if (profileObject) {
        return profileObject;
      } else {
        this.router.navigate(['/profiles']);
        return null;
      }
    });
  }
}
