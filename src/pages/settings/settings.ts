import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Countries } from '../../interfaces/countries.interface';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  countries: Countries[];

  constructor(public navCtrl:NavController, public navParams:NavParams) {
    this.countries = [
      {
        name: 'United States',
        code: 'US',
        currency: '$'
      },
      {
        name: 'United Kingdom',
        code: 'UK',
        currency: '£'
      },
      {
        name: 'Russia',
        code: 'RU',
        currency: 'руб.'
      }
    ];
  }

  getCountrySettings(){
    return this.countries;
  }

}