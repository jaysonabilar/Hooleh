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
import { HomePage } from '../home/home';
import { ApiService } from '../../providers/api-service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, apiService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.alertCtrl = alertCtrl;
        this.login = {
            username: '',
            password: '',
        };
        this.token = '';
    }
    LoginPage.prototype.loginUser = function (username, password) {
        var _this = this;
        this.apiService.login(username, password)
            .then(function (data) {
            _this.token = data.token;
            var loginDetails = {
                'username': username,
                'password': password,
                'token': _this.token
            };
            window.localStorage.removeItem("selectedViolations");
            window.localStorage.removeItem("sessionDriver");
            window.localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
            if (data.token) {
                _this.loginSuccessful();
            }
            else {
                _this.loginFailed();
            }
            if (_this.token.length > 1) {
                _this.navCtrl.setRoot(HomePage);
            }
            console.log(username);
            console.log(password);
            console.log(_this.token);
        });
    };
    LoginPage.prototype.loginSuccessful = function () {
        var alert = this.alertCtrl.create({
            title: "Login is successful!",
            buttons: ['Ok']
        });
        alert.present();
    };
    LoginPage.prototype.loginFailed = function () {
        var alert = this.alertCtrl.create({
            title: "Invalid email account or password!",
            buttons: ['Ok']
        });
        alert.present();
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [ApiService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ApiService, AlertController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map