import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalviolatorPage } from '../modalviolator/modalviolator';
import { TicketPage } from '../ticket/ticket';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
    presentModal() {
    this.navCtrl.push(ModalviolatorPage);
  }
  
  presentTicket() {
    this.navCtrl.push(TicketPage);
  }
  
}
