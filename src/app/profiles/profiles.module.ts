import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';

import { ProfileListComponent } from './profile-list.component';
import { ProfileDetailComponent } from './profile-detail.component';
import { ProfileObjectListComponent } from './profile-object-list.component';
import { ProfileObjectDetailComponent } from './profile-object-detail.component';
import { MathJaxDirective } from './mathjax.directive';

import { ProfileService } from './profile.service';

import { ProfilesRoutingModule } from './profiles-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    ProfilesRoutingModule
  ],
  declarations: [
    ProfileListComponent,
    ProfileDetailComponent,
    ProfileObjectListComponent,
    ProfileObjectDetailComponent,
    MathJaxDirective
  ],
  providers: [
    ProfileService
  ]
})
export class ProfilesModule { }
