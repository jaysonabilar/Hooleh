import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TicketPage } from '../pages/ticket/ticket';
import { LoginPage } from '../pages/login/login';
import { ModalviolatorPage } from '../pages/modalviolator/modalviolator';
import { ViolationsPage} from '../pages/violations/violations';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TicketPage,
    LoginPage,
    ModalviolatorPage,
    ViolationsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TicketPage,
    LoginPage,
    ModalviolatorPage,
    ViolationsPage

  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
