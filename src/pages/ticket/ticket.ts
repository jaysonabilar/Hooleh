import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViolationsPage} from '../violations/violations';
import { ApiService } from '../../providers/api-service';
import { Geolocation } from '@ionic-native/geolocation';
/*
  Generated class for the Ticket page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
  providers: [ApiService]
})
export class TicketPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService, public geolocation : Geolocation) {
      this.loginDetailsObject = localStorage.getItem('loginDetails');

      this.loginDetails = JSON.parse(this.loginDetailsObject);

      this.violationsObject = window.localStorage.getItem('selectedViolations');

      this.violationsSelectedObject = JSON.parse(this.violationsObject);

      console.log(this.violationsSelectedObject);


     this.geolocation.getCurrentPosition().then(res => {
     this.driverDetails.dblLatitude = res.coords.latitude.toString()
     this.driverDetails.dblLongitude = res.coords.longitude.toString();
    }).catch((error) => {
      console.log('Error getting location', error);
    });


     //this.violationsSelected = JSON.parse(this.loginDetailsObject);

    //  this.driverDetails.strDriverLicense = window.localStorage.getItem('driverLicense');

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
  }

  searchDriver(strDriverLicense)
  {  
     
    console.log(strDriverLicense);

    this.apiService.getSelectedDriver(this.loginDetails.token,strDriverLicense)
      .then(data => { 
        
        if(data.intDriverID)
        {
          this.driverDetails.intDriverID = data.intDriverID;
         // this.driverDetails.strDriverLicense = data.strDriverLicense;
          this.driverDetails.strDriverFirstName = data.strDriverFirstName;
          this.driverDetails.strDriverMiddleName = data.strDriverMiddleName;
          this.driverDetails.strDriverLastName = data.strDriverLastName;
          this.driverDetails.intLicenseType = data.intLicenseType;
          this.driverDetails.datLicenseExpiration = data.datLicenseExpiration;
          this.driverDetails.datDriverBirthday = data.datDriverBirthday;
          this.driverDetails.strLicenseType = data.strLicenseType;
          this.driverDetails.isExists = '1';
          console.log('meron');
       }
       else
       {
         console.log('wala');
          this.driverDetails.strDriverFirstName = '';
          this.driverDetails.strDriverMiddleName = '';
          this.driverDetails.strDriverLastName = '';
          this.driverDetails.intLicenseType = '';
          this.driverDetails.datLicenseExpiration = '';
          this.driverDetails.datDriverBirthday = '';
          this.driverDetails.strLicenseType = '';
          this.driverDetails.isExists = '0';
       }



    });
 

  }

  fileTicket(dblLongitude, dblLatitude, strDriverLicense, strDriverFirstName,strDriverMiddleName, strDriverLastName, 
    datDriverBirthday, datLicenseExpiration,intLicenseType, strPlateNumber, strRegistrationSticker, intVehicleTypeID,isExists)
  {
    if(isExists == '1')
    {
      this.apiService.addTicket(this.loginDetails.token, strDriverLicense, strRegistrationSticker, strPlateNumber, intVehicleTypeID,
              dblLatitude, dblLongitude, this.violationsObject)
        .then(data => { 
          this.object= data;
      });
    }
    else
    {
      this.apiService.addDriver(this.loginDetails.token, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName,
              intLicenseType, datLicenseExpiration, datDriverBirthday)
        .then(data => { 
          this.object= data;
      });

       this.apiService.addTicket(this.loginDetails.token, strDriverLicense, strRegistrationSticker, strPlateNumber, intVehicleTypeID,
              dblLatitude, dblLongitude, this.violationsObject)
        .then(data => { 
          this.object= data;
      });

    }

      
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
}

