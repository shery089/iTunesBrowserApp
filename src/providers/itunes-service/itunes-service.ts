import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import { CountriesProvider } from '../countries/countries';

@Injectable()
export class ItunesServiceProvider {

  constructor(public http: HttpClient, private countriesProvider: CountriesProvider) {
  }

  getResults(keyword) {
    return this.http.get('https://itunes.apple.com/search?term=' + keyword);
  }

  loadAlbums(id){
    //return this.http.get('https://itunes.apple.com/lookup?id=' + id + '&entity=album');
    let params = new HttpParams();
    params = params.set('id', id);
    params = params.set('entity', 'album');
    params = params.set('country', this.countriesProvider.getCurrentCountry().code);
    return this.http.get('https://itunes.apple.com/lookup', { params });
  }
}
