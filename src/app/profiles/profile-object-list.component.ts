import { Component, Output, EventEmitter } from '@angular/core';

import { ProfileObject } from './profile';

@Component({
  inputs: ['profileObjects'],
  selector: 'profile-object-list',
  templateUrl: './profile-object-list.component.html',
  styleUrls: ['./profile-object-list.component.css']
})
export class ProfileObjectListComponent {
  @Output() profileObjectSelected = new EventEmitter<ProfileObject>();

  onSelect(profileObject) {
    this.profileObjectSelected.emit(profileObject);
  }
}
