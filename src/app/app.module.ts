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
import { TicketingPage } from '../pages/ticketing/ticketing';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TicketPage,
    LoginPage,
    ModalviolatorPage,
    ViolationsPage,
    TicketingPage
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
    ViolationsPage,
    TicketingPage
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
