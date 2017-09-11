import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProfileObject } from './profile';

@Component({
  selector: 'app-profile-object-list',
  templateUrl: './profile-object-list.component.html',
  styleUrls: ['./profile-object-list.component.css']
})
export class ProfileObjectListComponent {

  selectedProfileObject: ProfileObject;

  @Input() profileObjects: ProfileObject[];

  @Output() profileObjectSelected = new EventEmitter<ProfileObject>();

  onSelect(profileObject) {
    this.selectedProfileObject = profileObject;
    this.profileObjectSelected.emit(profileObject);
  }
}
