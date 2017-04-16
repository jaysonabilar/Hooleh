import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service'
import { TicketPage } from '../ticket/ticket';
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
    dblPrice:'',
    isChecked:''
  }

  loginDetailsObject: any;
  loginDetails = {
    username:'',
    password:'',
    token:''
  };

  violationsSelected = [
    { }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService) {

  	this.loginDetailsObject = localStorage.getItem('loginDetails');

    this.loginDetails = JSON.parse(this.loginDetailsObject);

    this.listViolatorsToday();

    this.violationsSelected.pop();
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

  print(violationsDetails)
  {

    console.log(violationsDetails.isChecked);
    if(violationsDetails.isChecked == true)
    {  
        var id = violationsDetails.intViolationID;
         this.violationsSelected.push(
         {
             intViolationID: violationsDetails.intViolationID,
             strViolationCode:violationsDetails.strViolationCode,
             strViolationDescription:violationsDetails.strViolationDescription,
             dblPrice:violationsDetails.dblPrice,
             isChecked:violationsDetails.isChecked

         });
       //  window.localStorage.setItem(violationsDetails.intViolationID, JSON.stringify(violationsDetails));
         //this.listOfSelectedViolations.set(violationsDetails.intViolationID,violationsDetails.intViolationID);
    }
    else
    {
         //this.listOfSelectedViolations.delete(violationsDetails.intViolationID);
        // window.localStorage.removeItem(violationsDetails.intViolationID);
         //this.violationsSelected.violationsDetails.pop();
    }


  }

  confirmSelectedViolations()
  {  
     window.localStorage.setItem('selectedViolations', JSON.stringify(this.violationsSelected));
     this.navCtrl.setRoot(TicketPage
      );


      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViolationsPage');
  }

}
