import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


import { ITeam, Team } from './team';


@Injectable()
export class TeamsService {

  constructor(private http: Http) { }

  saveTeam(team: ITeam): Observable<ITeam> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.createTeam(team, options);
  }

private createTeam(team: ITeam, options: RequestOptions): Observable<ITeam> {
console.log(team)
  return this.http.post("http://localhost:4040/api/team", team, options)
  .map(this.extractData)
  .do(data => console.log('createProduct: ' + JSON.stringify(data)))
  .catch(this.handleError);
}

private extractData(response: Response) {
  let body = response.json();
  return body || {};
}

private handleError(error: Response): Observable<any> {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  console.error(error);
  return Observable.throw(error.json().error || 'Server error');
}
}
