import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Units } from './unit';
import { Unit } from './unit';
import { Prefix } from './unit';

@Component({
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent {

  units: Units;
  prefix: Prefix;

  selectedPrefix: Prefix;
  selectedNumerator: Unit;
  selectedDenominator: Unit;

  unitValue: string = '#x00000000';
  unitAddon: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { units: Units }) => {
      this.units = data.units;
    });
  }

  onSelectPrefix(prefix: Prefix) {
    this.selectedPrefix = prefix;
    this.updateUnitValueAndAddon();
  }

  onSelectNumerator(numerator: Unit) {
    this.selectedNumerator = numerator;
    this.updateUnitValueAndAddon();
  }

  onSelectDenominator(denominator: Unit) {
    this.selectedDenominator = denominator;
    this.updateUnitValueAndAddon();
  }

  updateUnitValueAndAddon() {
    let unitValue = "#x00000000";
    let unitAddon = '';
    if (this.selectedPrefix) {
      unitValue = unitValue.substr(0, 2) + _.padStart(this.selectedPrefix.notationIndexDecimal.toString(16).toUpperCase(), 2, '0') + unitValue.substr(4);
      unitAddon += this.selectedPrefix.symbolString;
    }
    if (this.selectedNumerator) {
      unitValue = unitValue.substr(0, 4) + _.padStart(this.selectedNumerator.notationIndexDecimal.toString(16).toUpperCase(), 2, '0') + unitValue.substr(6);
      unitAddon += this.selectedNumerator.symbolString;
    }
    if (this.selectedDenominator) {
      unitValue = unitValue.substr(0, 6) + _.padStart(this.selectedDenominator.notationIndexDecimal.toString(16).toUpperCase(), 2, '0') + unitValue.substr(8);
      if (this.selectedNumerator && this.selectedNumerator.symbolString && this.selectedDenominator.symbolString) {
        unitAddon += '/';
      }
      unitAddon += this.selectedDenominator.symbolString;
    }
    this.unitValue = unitValue;
    this.unitAddon = unitAddon;
  }
}
