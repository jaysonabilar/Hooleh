import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViolationsPage} from '../violations/violations';
/*
  Generated class for the Ticket page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html'
})
export class TicketPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
  }

  showListOfViolations()
  {
    this.navCtrl.push(ViolationsPage);
  }
}

