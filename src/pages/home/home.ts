import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalviolatorPage } from '../modalviolator/modalviolator';
import { TicketPage } from '../ticket/ticket';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiService } from '../../providers/api-service';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService]
})
export class HomePage {

  public lat : any;
  public long :any;

  loginDetails = {
    username:'',
    password:'',
    token:''
  };

  loginDetailsObject: any;

  violatorsTodayObject: any;

  violatorsTodayDetails= {
    intDriverID:'',
    strDriverLicense:'',
    strDriverFirstName:'',
    strDriverLastName:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation : Geolocation, public apiService: ApiService) {

    this.loginDetailsObject = localStorage.getItem('loginDetails');

    this.loginDetails = JSON.parse(this.loginDetailsObject);

    this.listViolatorsToday();

   // this.getEnforcerDetails();
  }

  listViolatorsToday()
  {
     this.apiService.getViolatorsToday(this.loginDetails.token)
      .then(data => { 
        this.violatorsTodayObject = data;
     });
      console.log(this.violatorsTodayObject);
    // this.enforcerDetails = JSON.parse(this.enforcerDetailsObject);
     

    // window.localStorage.setItem('enforcerDetails', JSON.stringify(this.enforcerDetailsObject));

  }

  /*
  getEnforcerDetails()
  {
     this.apiService.getEnforcerDetails(this.loginDetails.token)
      .then(data => { 
        this.enforcerDetailsObject = data;
     });
      console.log(this.enforcerDetailsObject);
    // this.enforcerDetails = JSON.parse(this.enforcerDetailsObject);
     

     window.localStorage.setItem('enforcerDetails', JSON.stringify(this.enforcerDetailsObject));

  }
  */
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
    presentModal() {
     this.geolocation.getCurrentPosition().then(res => {
     this.lat = res.coords.latitude;
     this.long = res.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    console.log(this.lat);
    console.log(this.long);
  }
  
  presentTicket() {

     this.geolocation.getCurrentPosition().then(res => {
     this.lat = res.coords.latitude;
     this.long = res.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    console.log(this.lat);
    console.log(this.long);
  }
  
}
