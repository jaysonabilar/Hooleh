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
import { ApiService } from '../../providers/api-service';
/*
  Generated class for the Modalviolator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ModalviolatorPage = (function () {
    function ModalviolatorPage(navCtrl, navParams, apiService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.loginDetails = {
            username: '',
            password: '',
            token: ''
        };
        this.violator = {
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
        this.violationDetails = {
            intViolationID: '',
            strViolationCode: '',
            strViolationDescription: '',
            dblPrice: ''
        };
        this.violator = this.navParams.get('violatorsTodayDetails');
        this.loginDetailsObject = localStorage.getItem('loginDetails');
        this.loginDetails = JSON.parse(this.loginDetailsObject);
        this.listDriverViolations();
    }
    ModalviolatorPage.prototype.listDriverViolations = function () {
        var _this = this;
        this.apiService.getDriverViolations(this.loginDetails.token, this.violator.strControlNumber)
            .then(function (data) {
            _this.violationsObject = data;
        });
    };
    ModalviolatorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalviolatorPage');
    };
    return ModalviolatorPage;
}());
ModalviolatorPage = __decorate([
    Component({
        selector: 'page-modalviolator',
        templateUrl: 'modalviolator.html',
        providers: [ApiService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ApiService])
], ModalviolatorPage);
export { ModalviolatorPage };
//# sourceMappingURL=modalviolator.js.map