import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// var domain = 'http://hooleh.herokuapp.com/';
var domain = 'http://hooleh.herokuapp.com/';
/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {
  object: any;

  constructor(public http: Http) {
    console.log('Hello ApiService Provider');
  }



  // login(username,password) {
  //   this.object;
  //   if (this.object) {
  //     return Promise.resolve(this.object);
  //   }
  //   // Dont have the data yet
  //   // let headers = new Headers({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' });

  //   let body = new FormData();
  //   body.append('username', username);
  //   body.append('password', password);

  //   return new Promise(resolve => {
  //     this.http.post(domain + 'api/authenticate', body)
  //       .map(res => res.json())
  //       .subscribe(
  //         data => {
  //           this.object = data;
  //           resolve(this.object);
  //         },
  //         error => {
  //           console.log(JSON.stringify(error.json()));
  //         }
  //       );
  //   });
  // } 


  login(username,password) {

    let body = new FormData();
    body.append('username', username);
    body.append('password', password);

    return this.http.post(domain + 'api/authenticate', body)
        .map((response:Response) => response.json())
        .catch(this.loginErrorHandler);
  } 

  loginErrorHandler(error: Response)
  {

    return Observable.throw(error || "loginError");
  }


  logout(token) {

    console.log(token);
    this.object;
    if (this.object) {
      return Promise.resolve(this.object);
    }
    // Dont have the data yet
    // let headers = new Headers({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' });

    let headers = new Headers({ 
      'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    

    return new Promise(resolve => {
      this.http.post(domain + 'api/logout', options)
        .map(res => res.json())
        .subscribe(
          data => {
            this.object = data;
            resolve(this.object);
          },
          error => {
            console.log(JSON.stringify(error.json()));
          }
        );
    });
  } 

  getEnforcerDetails(token) {
    if (this.object) {
      return Promise.resolve(this.object);
    }

    let headers = new Headers({ 
      'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    console.log(token);
    return new Promise(resolve => {
      this.http.get(domain + 'api/v1/enforcercurrentlogin',options)
        .map(res => res.json())
        .subscribe(data => {
          this.object = data;
          resolve(this.object);
        });
    });
  } 

  getViolatorsToday(token) {
    if (this.object) {
      return Promise.resolve(this.object);
    }
    let headers = new Headers({ 
      'Authorization': 'Bearer ' + token
    });
    let options = new RequestOptions({ headers: headers });

    console.log(token);
    return new Promise(resolve => {
      this.http.get(domain + 'api/v1/listviolationtoday',options)
        .map(res => res.json())
        .subscribe(data => {
          this.object = data;
          resolve(this.object);
        });
    });
  } 

  getViolatorsTodaySearched(token,licenseNumber) {
    var object;
    if (this.object) {
     
    }


    let headers = new Headers({ 
      'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    return new Promise(resolve => {
      this.http.get(domain + 'api/v1/listviolationtodaysearchselected/' + licenseNumber,options)
        .map(res => res.json())
        .subscribe(
          data => {
            object = data;
            resolve(object);
          },
          err => {
            console.log('driver not found.');
          }
        );
    });
  } 

  getDriverViolations(token,controlNumber) {
    if (this.object) {
      return Promise.resolve(this.object);
    }
    let headers = new Headers({ 
      'Authorization': 'Bearer ' + token});
    let options = new RequestOptions({ headers: headers });


    console.log(token);
    return new Promise(resolve => {
      this.http.get(domain + 'api/v1/violationdetails/' + controlNumber,options)
        .map(res => res.json())
        .subscribe(data => {
          this.object = data;
          resolve(this.object);
        });
    });
  } 

  getListOfViolations(token) {
    if (this.object) {
      return Promise.resolve(this.object);
    }

    let headers = new Headers({ 
      'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    console.log(token);
    return new Promise(resolve => {
      this.http.get(domain + 'api/v1/violations',options)
        .map(res => res.json())
        .subscribe(data => {
          this.object = data;
          resolve(this.object);
        });
    });
  } 

  // getSelectedDriver(token,licenseNumber) {
  
  //   let headers = new Headers({ 
  //     'Authorization': 'Bearer ' + token });
  //   let options = new RequestOptions({ headers: headers });

  //   return new Promise(resolve => {
  //     this.http.get(domain + 'api/v1/drivers/' + licenseNumber,options)
  //       .map(res => res.json())
  //       .subscribe(
  //         data => {
  //           object = data;
  //           resolve(object);
  //         },
  //         err => {
  //           console.log('driver not found.');
  //         }
  //       );
  //   });
  // } 

  getSelectedDriver(token,licenseNumber) {

   let headers = new Headers({ 
       'Authorization': 'Bearer ' + token});
   let options = new RequestOptions({ headers: headers });

    return this.http.get(domain + 'api/v1/drivers/' + licenseNumber,options)
        .map((response:Response) => response.json())
        .catch(this.getSelectedDriverErrorHandler);
  } 

  getSelectedDriverErrorHandler(error: Response)
  {
    return Observable.throw(error || "getSelectedDriverError");
  }


  // addTicket(token, strDriverLicenseNumber, strRegistrationSticker, strPlateNumber, intVehicleTypeID,
  //               dblLatitude, dblLongitude, violations) {

  //    let headers = new Headers({
  //     'Authorization': 'Bearer ' + token });
  //    let options = new RequestOptions({ headers: headers });

  //    console.log('pota ' + token);
  //     let body = new FormData();
  //     body.append('strDriverLicenseNumber', strDriverLicenseNumber);
  //     body.append('strRegistrationSticker', strRegistrationSticker);
  //     body.append('strPlateNumber', strPlateNumber);
  //     body.append('intVehicleTypeID', intVehicleTypeID);
  //     body.append('dblLatitude', dblLatitude);
  //     body.append('dblLongitude', dblLongitude);
  //     body.append('violations', violations);

  //   return new Promise(resolve => {
  //     this.http.post(domain + 'api/v1/driverviolations', body, options)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         this.object = data;
  //         resolve(this.object);
  //       });
  //   });
  // } 


  addTicket(token, strDriverLicenseNumber, strRegistrationSticker, strPlateNumber, intVehicleTypeID,
                dblLatitude, dblLongitude, violations) 
  {

    let headers = new Headers({
     'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    let body = new FormData();
      body.append('strDriverLicenseNumber', strDriverLicenseNumber);
      body.append('strRegistrationSticker', strRegistrationSticker);
      body.append('strPlateNumber', strPlateNumber);
      body.append('intVehicleTypeID', intVehicleTypeID);
      body.append('dblLatitude', dblLatitude);
      body.append('dblLongitude', dblLongitude);
      body.append('violations', violations);

    return this.http.post(domain + 'api/v1/driverviolations', body, options)
        .map((response:Response) => response.json())
        .catch(this.addTicketErrorHandler);
  } 

  addTicketErrorHandler(error: Response)
  {

    return Observable.throw(error || "addTicketError");
  }

  // addDriver(token, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName,
  //               intLicenseType, datLicenseExpiration, datDriverBirthday) {

  //    let headers = new Headers({
  //     'Authorization': 'Bearer ' + token });
  //    let options = new RequestOptions({ headers: headers });

  //     console.log('pota ' + token);
  //     let body = new FormData();
  //     body.append('strDriverLicense', strDriverLicense);
  //     body.append('strDriverFirstName', strDriverFirstName);
  //     body.append('strDriverMiddleName', strDriverMiddleName);
  //     body.append('strDriverLastName', strDriverLastName);
  //     body.append('intLicenseType', intLicenseType);
  //     body.append('datLicenseExpiration', datLicenseExpiration);
  //     body.append('datDriverBirthday', datDriverBirthday);

  //   return new Promise(resolve => {
  //     this.http.post(domain + 'api/v1/drivers', body, options)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         this.object = data;
  //         resolve(this.object);
  //       });
  //   });
  // } 

  addDriver(token, strDriverLicense, strDriverFirstName, strDriverMiddleName, strDriverLastName,
                intLicenseType, datLicenseExpiration, datDriverBirthday)
  {

    let headers = new Headers({
      'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    let body = new FormData();
      body.append('strDriverLicense', strDriverLicense);
      body.append('strDriverFirstName', strDriverFirstName);
      body.append('strDriverMiddleName', strDriverMiddleName);
      body.append('strDriverLastName', strDriverLastName);
      body.append('intLicenseType', intLicenseType);
      body.append('datLicenseExpiration', datLicenseExpiration);
      body.append('datDriverBirthday', datDriverBirthday);

    return this.http.post(domain + 'api/v1/drivers', body, options)
        .map((response:Response) => response.json())
        .catch(this.addDriverErrorHandler);
  } 

  addDriverErrorHandler(error: Response)
  {

    return Observable.throw(error || "addDriverError");
  }
  


}
