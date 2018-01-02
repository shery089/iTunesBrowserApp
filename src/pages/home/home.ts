import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nav: any;
  theSearchPage: any;

  constructor(public navCtrl: NavController) {
      this.nav = navCtrl;
      this.theSearchPage = SearchPage;
  }

  goToSearch() {
    this.nav.setRoot(SearchPage);
  }
}
