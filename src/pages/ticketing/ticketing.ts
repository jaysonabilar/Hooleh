import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  sessionDriverObject:any;
  sessionDriverDetails = { 
        strDriverLicense : '', 
        strDriverFirstName: '', 
        strDriverMiddleName: '',
        strDriverLastName: '', 
        datDriverBirthday: '', 
        datLicenseExpiration: '',
        intLicenseType: '', 
        strPlateNumber: '', 
        strRegistrationNumber: '',
        intVehicleType: '',
        isExists:''
      };

  object:any;

	ViolatorsProfile: string = "Personal";

  error : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService, public geolocation : Geolocation,
    private alertCtrl: AlertController) {
      this.loginDetailsObject = localStorage.getItem('loginDetails');
      this.loginDetails = JSON.parse(this.loginDetailsObject);


      if (this.violationsObject = window.localStorage.getItem('selectedViolations')){
        this.violationsSelectedObject = JSON.parse(this.violationsObject);

        console.log(this.violationsSelectedObject);
      }

      if (this.sessionDriverObject = window.localStorage.getItem('sessionDriver')){
        this.sessionDriverDetails = JSON.parse(this.sessionDriverObject);

        this.driverDetails.strDriverLicense = this.sessionDriverDetails.strDriverLicense;
        this.driverDetails.strDriverFirstName = this.sessionDriverDetails.strDriverFirstName;
        this.driverDetails.strDriverMiddleName = this.sessionDriverDetails.strDriverMiddleName;
        this.driverDetails.strDriverLastName = this.sessionDriverDetails.strDriverLastName;
        this.driverDetails.intLicenseType = this.sessionDriverDetails.intLicenseType;
        this.driverDetails.datLicenseExpiration = this.sessionDriverDetails.datLicenseExpiration;
        this.driverDetails.datDriverBirthday = this.sessionDriverDetails.datDriverBirthday;
        this.driverDetails.isExists = this.sessionDriverDetails.isExists;
        this.vehicleInfo.strPlateNumber = this.sessionDriverDetails.strPlateNumber;
        this.vehicleInfo.strRegistrationNumber = this.sessionDriverDetails.strRegistrationNumber;
        this.vehicleInfo.intVehicleType = this.sessionDriverDetails.intVehicleType;
        console.log(this.driverDetails);

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
    .subscribe(data => 
      {
          console.log(data);
          if(data.intDriverID){
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
            console.log('meron');        

         }
         else{
           console.log('wala');
            this.driverDetails.strDriverFirstName = '';
            this.driverDetails.strDriverMiddleName = '';
            this.driverDetails.strDriverLastName = '';
            this.driverDetails.intLicenseType = '';
            this.driverDetails.datLicenseExpiration = '';
            this.driverDetails.datDriverBirthday = '';
            this.driverDetails.strLicenseType = '';
            this.driverDetails.isExists = '0';
            this.driverNotExist(strDriverLicense);
         }
      },
      errormsg => 
      {
        this.error = errormsg;
        if(this.error)
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
            this.driverNotExist(strDriverLicense);
         }
      }
      );
  }

  driverNotExist(strDriverLicense) {
    let alert = this.alertCtrl.create({
      title: "License Number : " + strDriverLicense,
      subTitle : " has no records yet",
      buttons: ['Ok']
    });
    alert.present();
  }



  showListOfViolations(strDriverLicense, strDriverFirstName,strDriverMiddleName, strDriverLastName, datDriverBirthday, datLicenseExpiration,
         intLicenseType, strPlateNumber, strRegistrationNumber, intVehicleType, isExists)
  {
    
     var sessionDriver = { 
        'strDriverLicense': strDriverLicense, 
        'strDriverFirstName': strDriverFirstName, 
        'strDriverMiddleName': strDriverMiddleName,
        'strDriverLastName': strDriverLastName, 
        'datDriverBirthday': datDriverBirthday, 
        'datLicenseExpiration': datLicenseExpiration,
        'intLicenseType': intLicenseType, 
        'strPlateNumber': strPlateNumber, 
        'strRegistrationNumber': strRegistrationNumber,
        'intVehicleType': intVehicleType,
        'isExists': isExists
      };

      window.localStorage.setItem('sessionDriver', JSON.stringify(sessionDriver));

    this.navCtrl.push(ViolationsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketingPage');
  }

  fileTicket(dblLongitude, dblLatitude, strDriverLicense, strDriverFirstName,strDriverMiddleName, strDriverLastName, 
    datDriverBirthday, datLicenseExpiration,intLicenseType, strPlateNumber, strRegistrationSticker, intVehicleTypeID,isExists)
  {
    console.log(dblLongitude);
    console.log(dblLatitude);
    console.log(strDriverLicense);
    console.log(strDriverFirstName);
    console.log(strDriverMiddleName);
    console.log(strDriverLastName);
    console.log(datDriverBirthday);
    console.log(datLicenseExpiration);
    console.log(intLicenseType);
    console.log(strPlateNumber);
    console.log(strRegistrationSticker);
    console.log(intVehicleTypeID);
    console.log(isExists);

     let alert = this.alertCtrl.create({
      title: 'Confirm Transaction',
      message: 'Are you really want to file the ticket now?',
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
            if(isExists == '1')
            {
              this.fileTicketDriverExist(dblLongitude, dblLatitude, strDriverLicense, strDriverFirstName,strDriverMiddleName, strDriverLastName, 
                datDriverBirthday, datLicenseExpiration,intLicenseType, strPlateNumber, strRegistrationSticker, intVehicleTypeID,isExists);
            }
            else
            {
              this.fileTicketDriverNotxist(dblLongitude, dblLatitude, strDriverLicense, strDriverFirstName,strDriverMiddleName, strDriverLastName, 
                datDriverBirthday, datLicenseExpiration,intLicenseType, strPlateNumber, strRegistrationSticker, intVehicleTypeID,isExists);

            }

             
          }
        }
      ]
    });
    alert.present();   
  }

  fileTicketDriverExist(dblLongitude, dblLatitude, strDriverLicense, strDriverFirstName,strDriverMiddleName, strDriverLastName, 
    datDriverBirthday, datLicenseExpiration,intLicenseType, strPlateNumber, strRegistrationSticker, intVehicleTypeID,isExists)
  {
      this.apiService.addTicket(this.loginDetails.token, strDriverLicense, strRegistrationSticker, strPlateNumber, intVehicleTypeID,
          dblLatitude, dblLongitude, this.violationsObject)
      .subscribe(data => 
        {          
          window.localStorage.removeItem("selectedViolations");
          window.localStorage.removeItem("sessionDriver");
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
          this.insertTicketSuccessful();
        },
        errormsg => 
        {
          this.error = errormsg;
          if(this.error)
           {
                this.insertTicketFailed();
           }
        }
        );

  }

  fileTicketDriverNotxist(dblLongitude, dblLatitude, strDriverLicense, strDriverFirstName,strDriverMiddleName, strDriverLastName, 
    datDriverBirthday, datLicenseExpiration,intLicenseType, strPlateNumber, strRegistrationSticker, intVehicleTypeID,isExists)
  {
     
       this.apiService.addDriver(this.loginDetails.token, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName,
                intLicenseType, datLicenseExpiration, datDriverBirthday)
      .subscribe(data => 
        {          
           this.apiService.addTicket(this.loginDetails.token, strDriverLicense, strRegistrationSticker, strPlateNumber, intVehicleTypeID,
          dblLatitude, dblLongitude, this.violationsObject)
            .subscribe(data => 
              {          
                window.localStorage.removeItem("selectedViolations");
                window.localStorage.removeItem("sessionDriver");
                this.navCtrl.setRoot(this.navCtrl.getActive().component);
                this.insertTicketSuccessful();
              },
              errormsg => 
              {
                this.error = errormsg;
                if(this.error)
                 {
                      this.insertTicketFailed();
                 }
              }
              );
        },
        errormsg => 
        {
          this.error = errormsg;
          if(this.error)
           {
                this.insertTicketFailed();
           }
        }
        );
  }

  insertTicketSuccessful() {
    let alert = this.alertCtrl.create({
      title: "New Ticket has been sucessfully added!",
      buttons: ['Ok']
    });
    alert.present();
  }

  insertTicketFailed() {
    let alert = this.alertCtrl.create({
      title: "Failed to insert ticket. All fields except middle name is required to have value!!",
      buttons: ['Ok']
    });
    alert.present();
  }



}
