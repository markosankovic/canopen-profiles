import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';

import { UnitListComponent } from './unit-list.component';

import { UnitService } from './unit.service';

import { UnitsRoutingModule } from './units-routing.module';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    UnitsRoutingModule,
    ClipboardModule
  ],
  declarations: [
    UnitListComponent
  ],
  providers: [
    UnitService
  ]
})
export class UnitsModule { }
