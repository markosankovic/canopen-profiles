import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { ProfileObject, Profile } from './profile';

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get(this.getProfilesUrl()).map(this.extractData).catch(this.handleError);
  }

  getProfile(profileSeries): Observable<Profile> {
    return this.http.get(this.getProfileUrl(profileSeries)).map(this.extractData).catch(this.handleError);
  }

  getProfileObject(profileSeries, profileObjectIndex) {
    return this.http.get(this.getProfileObjectUrl(profileSeries, profileObjectIndex)).map(this.extractData).catch(this.handleError);
  }

  getProfilesUrl() {
    return `${environment.apiBaseUrl}/profiles`;
  }

  getProfileUrl(profileSeries) {
    return `${environment.apiBaseUrl}/profiles/${profileSeries}`;
  }

  getProfileObjectUrl(profileSeries, profileObjectIndex) {
    return `${environment.apiBaseUrl}/profiles/${profileSeries}/objects/${profileObjectIndex}`;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
