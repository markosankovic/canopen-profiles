import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Unit, Units, UnitValue, Prefix } from './unit';


@Component({
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent {

  units: Units;
  unitValue: UnitValue = new UnitValue(null, null, null);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { units: Units }) => {
      this.units = data.units;
    });
  }
}
