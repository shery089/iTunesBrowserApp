import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { ItunesServiceProvider } from '../../providers/itunes-service/itunes-service';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage {

  itune_api_results: any;
  keyword: string;
  usesFilter: boolean;
  _unfilteredResults: any;
  a: any;
  b: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private itunesServiceProvider: ItunesServiceProvider,
              public loading: LoadingController, public actionSheetCtrl: ActionSheetController) {
    this.itune_api_results = [];
    this.keyword = '';
    this.usesFilter = false;
    this._unfilteredResults = [];
  }

  showAllResults() {
    this.itune_api_results = this.getResults();
    this.keyword = '';
  }

  searchKeyword(e) {
    if(e.which === 13) {
      this.itune_api_results = this.getResults();
          //.filter((item)=>
      //item.trackName.toLowerCase().includes(this.keyword.toLowerCase()));
    }
  }

  getResults() {
    let loader = this.loading.create({
      spinner: 'bubbles',
      content: 'Loading <strong>' + this.keyword + '</strong> Results',
      duration: 3000
    });

    loader.present();
    return this.itunesServiceProvider.getResults(this.keyword).subscribe(response => {
          this.itune_api_results = response;
          this._unfilteredResults = response;
          this.usesFilter = true;
          loader.dismiss();
        },
        error => {
          console.log(error.status);
          //this.error = error.status;
          //this.profiles = '';
        });
  }

  openFilters(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filter By ...',
      buttons: [
        {
          text: 'Movies Only',
          handler: () => {
              let new_results = this._unfilteredResults.results.filter((item)=>item.kind === 'feature-movie');
              this.usesFilter = true;
              this.itune_api_results = [];
              this.itune_api_results.results = new_results;
              this.itune_api_results.resultCount = new_results.length;
          }
        },
        {
          text: 'Songs Only',
          handler: () => {
            let new_results = this._unfilteredResults.results.filter((item)=>item.kind === 'song');
            this.usesFilter = true;
            this.itune_api_results = [];
            this.itune_api_results.results = new_results;
            this.itune_api_results.resultCount = new_results.length;
          }
        },
        {
          text: 'Clear',
          style: 'destructive',
          handler: () => {
            this.itune_api_results = this._unfilteredResults;
            this.usesFilter = true;
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ],
    });
    actionSheet.present();
  }

}
