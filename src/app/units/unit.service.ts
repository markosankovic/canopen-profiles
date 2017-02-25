import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Units } from './unit';

@Injectable()
export class UnitService {

  constructor(private http: Http) { }

  getUnits(): Observable<Units> {
    return this.http.get(this.getUnitsUrl()).map(this.extractData).catch(this.handleError);
  }

  getUnitsUrl() {
    return `${environment.apiBaseUrl}/units`;
  }

  private extractData(res: Response) {
    return Units.fromObject(res.json());
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
