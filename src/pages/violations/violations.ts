import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service'
/*
  Generated class for the Violations page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-violations',
  templateUrl: 'violations.html',
  providers: [ApiService]
})
export class ViolationsPage {

  violationsObject: any;
  
  violationsDetails= {
    intViolationID:'',
    strViolationCode:'',
    strViolationDescription:'',
    dblPrice:''
  }

  loginDetailsObject: any;
  loginDetails = {
    username:'',
    password:'',
    token:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService) {

  	this.loginDetailsObject = localStorage.getItem('loginDetails');

    this.loginDetails = JSON.parse(this.loginDetailsObject);

    this.listViolatorsToday();

  }

  listViolatorsToday()
  {
     this.apiService.getListOfViolations(this.loginDetails.token)
      .then(data => { 
        this.violationsObject = data;
     });
      console.log(this.violationsObject);
    // this.enforcerDetails = JSON.parse(this.enforcerDetailsObject);
     

    // window.localStorage.setItem('enforcerDetails', JSON.stringify(this.enforcerDetailsObject));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViolationsPage');
  }

}
