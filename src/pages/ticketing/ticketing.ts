import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';
import { Geolocation } from '@ionic-native/geolocation';
import { ViolationsPage} from '../violations/violations';

/*
  Generated class for the Ticketing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ticketing',
  templateUrl: 'ticketing.html',
  providers: [ApiService]
})
export class TicketingPage {
  driverDetails={
    intDriverID:'',
    strDriverLicense:'',
    strDriverFirstName:'',
    strDriverMiddleName:'',
    strDriverLastName:'',
    intLicenseType:'',
    datLicenseExpiration:'',
    datDriverBirthday:'',
    strLicenseType:'',
    strRegistrationSticker:'',
    strPlateNumber:'',
    intVehicleTypeID:'',
    dblLatitude:'',
    dblLongitude:'',
    isExists:''
  };

  loginDetailsObject: any;

  loginDetails = {
    username:'',
    password:'',
    token:''
  };

  vehicleInfo = {
    strPlateNumber: '',
    strRegistrationNumber: '',
    intVehicleType: ''
  };

 
   violationsSelected = [{
     intViolationID : '',
     strViolationCode: '',
     strViolationDescription: '',
     dblPrice: '',
     isChecked:''
     }
  ];

  violationsObject: any;
  violationsSelectedObject: any;

  object:any;

	ViolatorsProfile: string = "Personal";
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService, public geolocation : Geolocation) {
      this.loginDetailsObject = localStorage.getItem('loginDetails');

      this.loginDetails = JSON.parse(this.loginDetailsObject);



      if (this.violationsObject = window.localStorage.getItem('selectedViolations')){
        this.violationsSelectedObject = JSON.parse(this.violationsObject);

        console.log(this.violationsSelectedObject);
      }

        

     this.geolocation.getCurrentPosition().then(res => {
     this.driverDetails.dblLatitude = res.coords.latitude.toString()
     this.driverDetails.dblLongitude = res.coords.longitude.toString();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  searchDriver(strDriverLicense)
  {  
     
    console.log(strDriverLicense);

    this.apiService.getSelectedDriver(this.loginDetails.token,strDriverLicense)
      .then(
        data => { 
          console.log(data);
          this.driverDetails.intDriverID = data.intDriverID;
         // this.driverDetails.strDriverLicense = data.strDriverLicense;
          this.driverDetails.strDriverFirstName = data.strDriverFirstname;
          this.driverDetails.strDriverMiddleName = data.strDriverMiddlename;
          this.driverDetails.strDriverLastName = data.strDriverLastname;
          this.driverDetails.intLicenseType = data.intLicenseType;
          this.driverDetails.datLicenseExpiration = data.datLicenseExpiration;
          this.driverDetails.datDriverBirthday = data.datDriverBirthday;
          this.driverDetails.strLicenseType = data.strLicenseType;
          this.driverDetails.isExists = '1';
      }
    );
  }

  showListOfViolations()
  {
    //  var sessionDriver = { 
    //   'firstname': this.driverDetails.strDriverFirstName, 
    //   'middlename': this.driverDetails.strDriverMiddleName, 
    //   'lastname': this.driverDetails.strDriverLastName,
    //   'bday' : this.driverDetails.datDriverBirthday,
    //   'licensetype' : this.driverDetails.strLicenseType,
    //   'licenseexpiration' : this.driverDetails.datLicenseExpiration
    // };

    //  window.localStorage.setItem('sessionDriver', JSON.stringify(sessionDriver));
    this.navCtrl.push(ViolationsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketingPage');
  }

}
