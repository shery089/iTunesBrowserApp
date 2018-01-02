import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ItunesServiceProvider {

  constructor(public http: HttpClient) {
  }

  getResults(keyword) {
    return this.http.get('https://itunes.apple.com/search?term=' + keyword);
  }

}
