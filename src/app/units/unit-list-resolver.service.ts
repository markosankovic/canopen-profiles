import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Units } from './unit';
import { UnitService } from './unit.service';

@Injectable()
export class UnitListResolver implements Resolve<Units> {

  constructor(private unitService: UnitService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Units> {
    return this.unitService.getUnits().toPromise().then(units => {
      if (units) {
        return units;
      } else {
        this.router.navigate(['/']);
        return null;
      }
    });
  }
}
