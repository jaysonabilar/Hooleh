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
import { TicketingPage } from '../ticketing/ticketing';
/*
  Generated class for the Violations page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ViolationsPage = (function () {
    function ViolationsPage(navCtrl, navParams, apiService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.violationsDetails = {
            intViolationID: '',
            strViolationCode: '',
            strViolationDescription: '',
            dblPrice: '',
            isChecked: ''
        };
        this.loginDetails = {
            username: '',
            password: '',
            token: ''
        };
        this.violationsSelected = [
            {}
        ];
        this.loginDetailsObject = localStorage.getItem('loginDetails');
        this.loginDetails = JSON.parse(this.loginDetailsObject);
        this.listViolatorsToday();
        this.violationsSelected.pop();
    }
    ViolationsPage.prototype.listViolatorsToday = function () {
        var _this = this;
        this.apiService.getListOfViolations(this.loginDetails.token)
            .then(function (data) {
            _this.violationsObject = data;
        });
        console.log(this.violationsObject);
        // this.enforcerDetails = JSON.parse(this.enforcerDetailsObject);
        // window.localStorage.setItem('enforcerDetails', JSON.stringify(this.enforcerDetailsObject));
    };
    ViolationsPage.prototype.print = function (violationsDetails) {
        console.log(violationsDetails.isChecked);
        if (violationsDetails.isChecked == true) {
            var id = violationsDetails.intViolationID;
            this.violationsSelected.push({
                intViolationID: violationsDetails.intViolationID,
                strViolationCode: violationsDetails.strViolationCode,
                strViolationDescription: violationsDetails.strViolationDescription,
                dblPrice: violationsDetails.dblPrice,
                isChecked: violationsDetails.isChecked
            });
        }
        else {
        }
    };
    ViolationsPage.prototype.confirmSelectedViolations = function () {
        window.localStorage.setItem('selectedViolations', JSON.stringify(this.violationsSelected));
        this.navCtrl.setRoot(TicketingPage);
    };
    ViolationsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViolationsPage');
    };
    return ViolationsPage;
}());
ViolationsPage = __decorate([
    Component({
        selector: 'page-violations',
        templateUrl: 'violations.html',
        providers: [ApiService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ApiService])
], ViolationsPage);
export { ViolationsPage };
//# sourceMappingURL=violations.js.map