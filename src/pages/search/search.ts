import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,
          ActionSheetController, ModalController, AlertController } from 'ionic-angular';
import { PreviewModalPage } from '../preview-modal/preview-modal';
import { ArtistPage } from '../artist/artist';
import { ItunesServiceProvider } from '../../providers/itunes-service/itunes-service';
import { Keyboard } from '@ionic-native/keyboard';
import { shuffle } from 'lodash';

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
              public loading: LoadingController, public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController, private keyboard: Keyboard, private alertCtrl: AlertController) {
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
      if(this.keyword === ''){
        let noResultsAlert = this.alertCtrl.create({
          title: 'Empty Search Not Allowed',
          subTitle: 'Please key in your search',
          inputs: [
            {
              name: 'term',
              placeholder: 'Search For...'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Search...',
              handler: data => {
                if (data.term) {
                  this.keyword = data.term;
                  this.getResults();
                } else {
                  return false;
                }
              }
            }
          ]
        });
        noResultsAlert.present();
        return;
      }

      this.itune_api_results = this.getResults();
          //.filter((item)=>
      //item.trackName.toLowerCase().includes(this.keyword.toLowerCase()));
  }

  noResultsAlert() {
    let alert = this.alertCtrl.create({
      title: 'The iTunes API says...',
      subTitle: 'No Match Found',
      buttons: ["I'll Try Again"]
    });
    alert.present();
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

          if(!this.itune_api_results.resultCount) {
            this.noResultsAlert();
          }
          loader.dismiss();
        },
        error => {
          console.log(error.status);
          //this.error = error.status;
          //this.profiles = '';
        });
  }

  gotoArtist(result) {
    this.navCtrl.push(ArtistPage, {
      'id': result.artistId,
      'name': result.artistName
    });
  }

  openPreview(track) {

    let confirmPreviewAlert = this.alertCtrl.create({
      title: 'Are You Sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            confirmPreviewAlert.dismiss()
            .then(() => {
              let modal = this.modalCtrl.create(PreviewModalPage, {'track': track});
              modal.present();
            });
            return false;
          }
        }
      ]
    });
    confirmPreviewAlert.present();
  }

  reloadData(event) {
    this.itune_api_results = [];
    return this.itunesServiceProvider.getResults(this.keyword).subscribe(response => {
          event.cancel();
          if(response) {
            this.itune_api_results.results = this._unfilteredResults.results = shuffle(response['results']);
          }
          this.usesFilter = true;
        },
        error => {
          console.log(error.status);
        });
  }

  openFilters(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filter By ...',
      buttons: [
        {
          text: 'Clear',
          role: 'destructive',
          handler: () => {
            this.itune_api_results = this._unfilteredResults;
            this.usesFilter = true;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
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
        }
      ],
    });
    actionSheet.present();
  }
}
