import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';
/*
  Generated class for the Modalviolator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modalviolator',
  templateUrl: 'modalviolator.html',
  providers: [ApiService]
})
export class ModalviolatorPage {
  
  loginDetails = {
    username:'',
    password:'',
    token:''
  };

  loginDetailsObject: any;

  violator= {
    intDriverID:'',
    strDriverLicense:'',
    strDriverMiddleName:'',
    strDriverFirstName:'',
    strDriverLastName:'',
    datLicenseExpiration:'',
    datDriverBirthday:'',
    intViolationTransactionHeaderID:'',
    strControlNumber:'',
    intEnforcerID:'',
    strRegistrationSticker:'',
    strPlateNumber:''
  }

  violationsObject: any;

  violationDetails = {
  	intViolationID:'',
  	strViolationCode:'',
  	strViolationDescription:'',
  	dblPrice:''
  }

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService) {
  	this.violator = this.navParams.get('violatorsTodayDetails');

  	this.loginDetailsObject = localStorage.getItem('loginDetails');

    this.loginDetails = JSON.parse(this.loginDetailsObject);

    this.listDriverViolations();

  }

  listDriverViolations()
  {
  	this.apiService.getDriverViolations(this.loginDetails.token,this.violator.strControlNumber)
      .then(data => { 
        this.violationsObject = data;
     });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalviolatorPage');
  }

}
