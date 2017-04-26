import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ModalviolatorPage } from '../modalviolator/modalviolator';
import { TicketPage } from '../ticket/ticket';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiService } from '../../providers/api-service';
import { LoginPage } from '../login/login';
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
    strDriverMiddlename:'',
    strDriverFirstname:'',
    strDriverLastname:'',
    datLicenseExpiration:'',
    datDriverBirthday:'',
    intViolationTransactionHeaderID:'',
    strControlNumber:'',
    intEnforcerID:'',
    strRegistrationSticker:'',
    strPlateNumber:''
  }

  searchedDriverLicense:'';

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation : Geolocation, public apiService: ApiService,
    private alertCtrl: AlertController) {

    this.loginDetailsObject = window.localStorage.getItem('loginDetails');

    this.loginDetails = JSON.parse(this.loginDetailsObject);

    this.listViolatorsToday();

     window.localStorage.removeItem("selectedViolations");
     window.localStorage.removeItem("sessionDriver");
     this.searchedDriverLicense = '';

   // this.getEnforcerDetails();
  }

  getDriverViolations(violatorsTodayDetails)
  {
      this.navCtrl.push(ModalviolatorPage, {
      violatorsTodayDetails : violatorsTodayDetails
    });
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

  onInputSearch(searched)
  {
    if(searched=='')
    {
      console.log("pita");
      this.listViolatorsToday();
    }
    else
    {
      console.log("pita");
      this.apiService.getViolatorsTodaySearched(this.loginDetails.token,searched)
        .then(data => { 
          console.log(data);
          this.violatorsTodayObject = data;

       });
        console.log(this.violatorsTodayObject);
    }

  }

  onCancelSearch()
  {
    this.listViolatorsToday();
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
  
  logout()
  {
   
      let alert = this.alertCtrl.create({
      title: 'Confirm logout',
      message: 'Are you really want to Logout now?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
             console.log('Cancel Ticketing');
          }
        },
        {
          text: 'Yes',
          handler: () => {  
              this.apiService.logout(this.loginDetails.token)
              .then(data => { 
                console.log(data);
             });

             this.navCtrl.setRoot(LoginPage);

          }
        }
      ]
    });
    alert.present();
  }
  
}
