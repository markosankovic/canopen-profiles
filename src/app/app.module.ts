import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { ProfilesModule } from './profiles/profiles.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    SharedModule,
    ProfilesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
