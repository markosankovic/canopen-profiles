import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitListResolver } from './unit-list-resolver.service';

import { UnitListComponent } from './unit-list.component';

const unitsRoutes: Routes = [
  {
    path: 'units',
    component: UnitListComponent,
    resolve: {
      units: UnitListResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(unitsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UnitListResolver
  ]
})
export class UnitsRoutingModule { }
