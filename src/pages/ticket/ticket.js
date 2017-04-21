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
import { ViolationsPage } from '../violations/violations';
import { ApiService } from '../../providers/api-service';
import { Geolocation } from '@ionic-native/geolocation';
/*
  Generated class for the Ticket page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TicketPage = (function () {
    function TicketPage(navCtrl, navParams, apiService, geolocation) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.geolocation = geolocation;
        this.driverDetails = {
            intDriverID: '',
            strDriverLicense: '',
            strDriverFirstName: '',
            strDriverMiddleName: '',
            strDriverLastName: '',
            intLicenseType: '',
            datLicenseExpiration: '',
            datDriverBirthday: '',
            strLicenseType: '',
            strRegistrationSticker: '',
            strPlateNumber: '',
            intVehicleTypeID: '',
            dblLatitude: '',
            dblLongitude: '',
            isExists: ''
        };
        this.loginDetails = {
            username: '',
            password: '',
            token: ''
        };
        this.violationsSelected = [{
                intViolationID: '',
                strViolationCode: '',
                strViolationDescription: '',
                dblPrice: '',
                isChecked: ''
            }
        ];
        this.loginDetailsObject = localStorage.getItem('loginDetails');
        this.loginDetails = JSON.parse(this.loginDetailsObject);
        this.violationsObject = window.localStorage.getItem('selectedViolations');
        this.violationsSelectedObject = JSON.parse(this.violationsObject);
        console.log(this.violationsSelectedObject);
        this.geolocation.getCurrentPosition().then(function (res) {
            _this.driverDetails.dblLatitude = res.coords.latitude.toString();
            _this.driverDetails.dblLongitude = res.coords.longitude.toString();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        //this.violationsSelected = JSON.parse(this.loginDetailsObject);
        //  this.driverDetails.strDriverLicense = window.localStorage.getItem('driverLicense');
    }
    TicketPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TicketPage');
    };
    TicketPage.prototype.searchDriver = function (strDriverLicense) {
        var _this = this;
        console.log(strDriverLicense);
        this.apiService.getSelectedDriver(this.loginDetails.token, strDriverLicense)
            .then(function (data) {
            if (data.intDriverID) {
                _this.driverDetails.intDriverID = data.intDriverID;
                // this.driverDetails.strDriverLicense = data.strDriverLicense;
                _this.driverDetails.strDriverFirstName = data.strDriverFirstName;
                _this.driverDetails.strDriverMiddleName = data.strDriverMiddleName;
                _this.driverDetails.strDriverLastName = data.strDriverLastName;
                _this.driverDetails.intLicenseType = data.intLicenseType;
                _this.driverDetails.datLicenseExpiration = data.datLicenseExpiration;
                _this.driverDetails.datDriverBirthday = data.datDriverBirthday;
                _this.driverDetails.strLicenseType = data.strLicenseType;
                _this.driverDetails.isExists = '1';
                console.log('meron');
            }
            else {
                console.log('wala');
                _this.driverDetails.strDriverFirstName = '';
                _this.driverDetails.strDriverMiddleName = '';
                _this.driverDetails.strDriverLastName = '';
                _this.driverDetails.intLicenseType = '';
                _this.driverDetails.datLicenseExpiration = '';
                _this.driverDetails.datDriverBirthday = '';
                _this.driverDetails.strLicenseType = '';
                _this.driverDetails.isExists = '0';
            }
        });
    };
    TicketPage.prototype.fileTicket = function (dblLongitude, dblLatitude, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName, datDriverBirthday, datLicenseExpiration, intLicenseType, strPlateNumber, strRegistrationSticker, intVehicleTypeID, isExists) {
        var _this = this;
        if (isExists == '1') {
            this.apiService.addTicket(this.loginDetails.token, strDriverLicense, strRegistrationSticker, strPlateNumber, intVehicleTypeID, dblLatitude, dblLongitude, this.violationsObject)
                .then(function (data) {
                _this.object = data;
            });
        }
        else {
            this.apiService.addDriver(this.loginDetails.token, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName, intLicenseType, datLicenseExpiration, datDriverBirthday)
                .then(function (data) {
                _this.object = data;
            });
            this.apiService.addTicket(this.loginDetails.token, strDriverLicense, strRegistrationSticker, strPlateNumber, intVehicleTypeID, dblLatitude, dblLongitude, this.violationsObject)
                .then(function (data) {
                _this.object = data;
            });
        }
    };
    TicketPage.prototype.showListOfViolations = function () {
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
    };
    return TicketPage;
}());
TicketPage = __decorate([
    Component({
        selector: 'page-ticket',
        templateUrl: 'ticket.html',
        providers: [ApiService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ApiService, Geolocation])
], TicketPage);
export { TicketPage };
//# sourceMappingURL=ticket.js.map