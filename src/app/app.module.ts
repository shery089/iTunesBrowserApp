import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { PreviewModalPage } from '../pages/preview-modal/preview-modal';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { ArtistPage } from '../pages/artist/artist';

import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItunesServiceProvider } from '../providers/itunes-service/itunes-service';
import { CountriesProvider } from '../providers/countries/countries';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SearchPage,
    SettingsPage,
    PreviewModalPage,
    ContactUsPage,
    ArtistPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SearchPage,
    SettingsPage,
    PreviewModalPage,
    ContactUsPage,
    ArtistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItunesServiceProvider,
    Keyboard,
    CountriesProvider
  ]
})
export class AppModule {}
