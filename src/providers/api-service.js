var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// var domain = 'http://hooleh.herokuapp.com/';
var domain = 'http://localhost:8000/';
/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        console.log('Hello ApiService Provider');
    }
    ApiService.prototype.login = function (username, password) {
        var _this = this;
        this.object;
        if (this.object) {
            return Promise.resolve(this.object);
        }
        // Dont have the data yet
        // let headers = new Headers({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' });
        var body = new FormData();
        body.append('username', username);
        body.append('password', password);
        return new Promise(function (resolve) {
            _this.http.post(domain + 'api/authenticate', body)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.object = data;
                resolve(_this.object);
            }, function (err) {
                console.log(err);
            });
        });
    };
    ApiService.prototype.getEnforcerDetails = function (token) {
        var _this = this;
        if (this.object) {
            return Promise.resolve(this.object);
        }
        var headers = new Headers({
            'Authorization': 'Bearer ' + token
        });
        var options = new RequestOptions({ headers: headers });
        console.log(token);
        return new Promise(function (resolve) {
            _this.http.get(domain + 'api/v1/enforcercurrentlogin', options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.object = data;
                resolve(_this.object);
            });
        });
    };
    ApiService.prototype.getViolatorsToday = function (token) {
        var _this = this;
        if (this.object) {
            return Promise.resolve(this.object);
        }
        var headers = new Headers({
            'Authorization': 'Bearer ' + token
        });
        var options = new RequestOptions({ headers: headers });
        console.log(token);
        return new Promise(function (resolve) {
            _this.http.get(domain + 'api/v1/listviolationtoday', options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.object = data;
                resolve(_this.object);
            });
        });
    };
    ApiService.prototype.getDriverViolations = function (token, controlNumber) {
        var _this = this;
        if (this.object) {
            return Promise.resolve(this.object);
        }
        var headers = new Headers({
            'Authorization': 'Bearer ' + token
        });
        var options = new RequestOptions({ headers: headers });
        console.log(token);
        return new Promise(function (resolve) {
            _this.http.get(domain + 'api/v1/violationdetails/' + controlNumber, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.object = data;
                resolve(_this.object);
            });
        });
    };
    ApiService.prototype.getListOfViolations = function (token) {
        var _this = this;
        if (this.object) {
            return Promise.resolve(this.object);
        }
        var headers = new Headers({
            'Authorization': 'Bearer ' + token
        });
        var options = new RequestOptions({ headers: headers });
        console.log(token);
        return new Promise(function (resolve) {
            _this.http.get(domain + 'api/v1/violations', options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.object = data;
                resolve(_this.object);
            });
        });
    };
    ApiService.prototype.getSelectedDriver = function (token, licenseNumber) {
        var _this = this;
        console.log('this' + token);
        var object;
        if (this.object) {
            console.log('jelo');
            return Promise.resolve(this.object);
        }
        var headers = new Headers({
            'Authorization': 'Bearer ' + token
        });
        var options = new RequestOptions({ headers: headers });
        return new Promise(function (resolve) {
            _this.http.get(domain + 'api/v1/drivers/' + licenseNumber, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                object = data;
                resolve(object);
            }, function (err) {
                console.log('driver not found.');
            });
        });
    };
    ApiService.prototype.addTicket = function (token, strDriverLicenseNumber, strRegistrationSticker, strPlateNumber, intVehicleTypeID, dblLatitude, dblLongitude, violations) {
        var _this = this;
        var headers = new Headers({
            'Authorization': 'Bearer ' + token
        });
        var options = new RequestOptions({ headers: headers });
        console.log('pota ' + token);
        var body = new FormData();
        body.append('strDriverLicenseNumber', strDriverLicenseNumber);
        body.append('strRegistrationSticker', strRegistrationSticker);
        body.append('strControlNumber', '112222');
        body.append('strPlateNumber', strPlateNumber);
        body.append('intVehicleTypeID', intVehicleTypeID);
        body.append('dblLatitude', dblLatitude);
        body.append('dblLongitude', dblLongitude);
        body.append('violations', violations);
        return new Promise(function (resolve) {
            _this.http.post(domain + 'api/v1/driverviolations', body, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.object = data;
                resolve(_this.object);
            });
        });
    };
    ApiService.prototype.addDriver = function (token, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName, intLicenseType, datLicenseExpiration, datDriverBirthday) {
        var _this = this;
        var headers = new Headers({
            'Authorization': 'Bearer ' + token
        });
        var options = new RequestOptions({ headers: headers });
        console.log('pota ' + token);
        var body = new FormData();
        body.append('strDriverLicense', strDriverLicense);
        body.append('strDriverFirstName', strDriverFirstName);
        body.append('strDriverMiddleName', strDriverMiddleName);
        body.append('strDriverLastName', strDriverLastName);
        body.append('intLicenseType', intLicenseType);
        body.append('datLicenseExpiration', datLicenseExpiration);
        body.append('datDriverBirthday', datDriverBirthday);
        return new Promise(function (resolve) {
            _this.http.post(domain + 'api/v1/drivers', body, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.object = data;
                resolve(_this.object);
            });
        });
    };
    return ApiService;
}());
ApiService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ApiService);
export { ApiService };
//# sourceMappingURL=api-service.js.map