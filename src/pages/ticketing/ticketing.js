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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';
import { Geolocation } from '@ionic-native/geolocation';
import { ViolationsPage } from '../violations/violations';
/*
  Generated class for the Ticketing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TicketingPage = (function () {
    function TicketingPage(navCtrl, navParams, apiService, geolocation, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
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
        this.vehicleInfo = {
            strPlateNumber: '',
            strRegistrationNumber: '',
            intVehicleType: ''
        };
        this.violationsSelected = [{
                intViolationID: '',
                strViolationCode: '',
                strViolationDescription: '',
                dblPrice: '',
                isChecked: ''
            }
        ];
        this.sessionDriverDetails = {
            strDriverLicense: '',
            strDriverFirstName: '',
            strDriverMiddleName: '',
            strDriverLastName: '',
            datDriverBirthday: '',
            datLicenseExpiration: '',
            intLicenseType: '',
            strPlateNumber: '',
            strRegistrationNumber: '',
            intVehicleType: '',
            isExists: ''
        };
        this.ViolatorsProfile = "Personal";
        this.loginDetailsObject = localStorage.getItem('loginDetails');
        this.loginDetails = JSON.parse(this.loginDetailsObject);
        if (this.violationsObject = window.localStorage.getItem('selectedViolations')) {
            this.violationsSelectedObject = JSON.parse(this.violationsObject);
            console.log(this.violationsSelectedObject);
        }
        if (this.sessionDriverObject = window.localStorage.getItem('sessionDriver')) {
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
        this.geolocation.getCurrentPosition().then(function (res) {
            _this.driverDetails.dblLatitude = res.coords.latitude.toString();
            _this.driverDetails.dblLongitude = res.coords.longitude.toString();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    }
    TicketingPage.prototype.searchDriver = function (strDriverLicense) {
        var _this = this;
        console.log(strDriverLicense);
        this.apiService.getSelectedDriver(this.loginDetails.token, strDriverLicense)
            .then(function (data) {
            console.log(data);
            if (data.intDriverID) {
                _this.driverDetails.intDriverID = data.intDriverID;
                // this.driverDetails.strDriverLicense = data.strDriverLicense;
                _this.driverDetails.strDriverFirstName = data.strDriverFirstname;
                _this.driverDetails.strDriverMiddleName = data.strDriverMiddlename;
                _this.driverDetails.strDriverLastName = data.strDriverLastname;
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
                _this.driverNotExist(strDriverLicense);
            }
        });
    };
    TicketingPage.prototype.driverNotExist = function (strDriverLicense) {
        var alert = this.alertCtrl.create({
            title: "License Number : " + strDriverLicense,
            subTitle: " has no records yet",
            buttons: ['Ok']
        });
        alert.present();
    };
    TicketingPage.prototype.showListOfViolations = function (strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName, datDriverBirthday, datLicenseExpiration, intLicenseType, strPlateNumber, strRegistrationNumber, intVehicleType, isExists) {
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
    };
    TicketingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TicketingPage');
    };
    TicketingPage.prototype.fileTicket = function (dblLongitude, dblLatitude, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName, datDriverBirthday, datLicenseExpiration, intLicenseType, strPlateNumber, strRegistrationSticker, intVehicleTypeID, isExists) {
        var _this = this;
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
        var alert = this.alertCtrl.create({
            title: 'Confirm Transaction',
            message: 'Are you really want to file the ticket now?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel Ticketing');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        if (isExists == '1') {
                            _this.apiService.addTicket(_this.loginDetails.token, strDriverLicense, strRegistrationSticker, strPlateNumber, intVehicleTypeID, dblLatitude, dblLongitude, _this.violationsObject)
                                .then(function (data) {
                                _this.object = data;
                            });
                        }
                        else {
                            _this.apiService.addDriver(_this.loginDetails.token, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName, intLicenseType, datLicenseExpiration, datDriverBirthday)
                                .then(function (data) {
                                _this.object = data;
                            });
                            _this.apiService.addTicket(_this.loginDetails.token, strDriverLicense, strRegistrationSticker, strPlateNumber, intVehicleTypeID, dblLatitude, dblLongitude, _this.violationsObject)
                                .then(function (data) {
                                _this.object = data;
                            });
                        }
                        window.localStorage.removeItem("selectedViolations");
                        window.localStorage.removeItem("sessionDriver");
                        _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                        _this.insertTicketSuccessful();
                    }
                }
            ]
        });
        alert.present();
    };
    TicketingPage.prototype.insertTicketSuccessful = function () {
        var alert = this.alertCtrl.create({
            title: "New Ticket has been sucessfully added!",
            buttons: ['Ok']
        });
        alert.present();
    };
    return TicketingPage;
}());
TicketingPage = __decorate([
    Component({
        selector: 'page-ticketing',
        templateUrl: 'ticketing.html',
        providers: [ApiService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ApiService, Geolocation,
        AlertController])
], TicketingPage);
export { TicketingPage };
//# sourceMappingURL=ticketing.js.map