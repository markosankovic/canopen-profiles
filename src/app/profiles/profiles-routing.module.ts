import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileListResolver } from './profile-list-resolver.service';
import { ProfileDetailResolver } from './profile-detail-resolver.service';
import { ProfileObjectDetailResolver } from './profile-object-detail-resolver.service';

import { ProfileListComponent } from './profile-list.component';
import { ProfileDetailComponent } from './profile-detail.component';
import { ProfileObjectListComponent } from './profile-object-list.component';
import { ProfileObjectDetailComponent } from './profile-object-detail.component';

const profilesRoutes: Routes = [
  {
    path: 'profiles',
    component: ProfileListComponent,
    resolve: {
      profiles: ProfileListResolver
    },
    children: [
      {
        path: ':series',
        component: ProfileDetailComponent,
        resolve: {
          profile: ProfileDetailResolver
        },
        children: [
          {
            path: 'objects/:index',
            component: ProfileObjectDetailComponent,
            resolve: {
              profileObject: ProfileObjectDetailResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(profilesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProfileListResolver,
    ProfileDetailResolver,
    ProfileObjectDetailResolver
  ]
})
export class ProfilesRoutingModule { }
