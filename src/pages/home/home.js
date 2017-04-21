var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalviolatorPage } from '../modalviolator/modalviolator';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiService } from '../../providers/api-service';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var HomePage = (function () {
    function HomePage(navCtrl, navParams, geolocation, apiService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.apiService = apiService;
        this.loginDetails = {
            username: '',
            password: '',
            token: ''
        };
        this.violatorsTodayDetails = {
            intDriverID: '',
            strDriverLicense: '',
            strDriverMiddleName: '',
            strDriverFirstName: '',
            strDriverLastName: '',
            datLicenseExpiration: '',
            datDriverBirthday: '',
            intViolationTransactionHeaderID: '',
            strControlNumber: '',
            intEnforcerID: '',
            strRegistrationSticker: '',
            strPlateNumber: ''
        };
        this.loginDetailsObject = window.localStorage.getItem('loginDetails');
        this.loginDetails = JSON.parse(this.loginDetailsObject);
        this.listViolatorsToday();
        window.localStorage.removeItem("selectedViolations");
        window.localStorage.removeItem("sessionDriver");
        // this.getEnforcerDetails();
    }
    HomePage.prototype.getDriverViolations = function (violatorsTodayDetails) {
        this.navCtrl.push(ModalviolatorPage, {
            violatorsTodayDetails: violatorsTodayDetails
        });
    };
    HomePage.prototype.listViolatorsToday = function () {
        var _this = this;
        this.apiService.getViolatorsToday(this.loginDetails.token)
            .then(function (data) {
            _this.violatorsTodayObject = data;
        });
        console.log(this.violatorsTodayObject);
        // this.enforcerDetails = JSON.parse(this.enforcerDetailsObject);
        // window.localStorage.setItem('enforcerDetails', JSON.stringify(this.enforcerDetailsObject));
    };
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
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.presentModal = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (res) {
            _this.lat = res.coords.latitude;
            _this.long = res.coords.longitude;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        console.log(this.lat);
        console.log(this.long);
    };
    HomePage.prototype.presentTicket = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (res) {
            _this.lat = res.coords.latitude;
            _this.long = res.coords.longitude;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        console.log(this.lat);
        console.log(this.long);
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [ApiService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Geolocation, ApiService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map