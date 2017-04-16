import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

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



  login(username,password) {
    if (this.object) {
      return Promise.resolve(this.object);
    }
    // Dont have the data yet

    // let headers = new Headers({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' });

    let body = new FormData();
    body.append('username', username);
    body.append('password', password);

    return new Promise(resolve => {
      this.http.post('http://localhost:8000/api/authenticate', body)
        .map(res => res.json())
        .subscribe(data => {
          this.object = data;
          resolve(this.object);
        });
    });
  } 

  getEnforcerDetails(token) {
    if (this.object) {
      return Promise.resolve(this.object);
    }

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    console.log(token);
    return new Promise(resolve => {
      this.http.get('http://localhost:8000/api/v1/enforcercurrentlogin',options)
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
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    let options = new RequestOptions({ headers: headers });

    console.log(token);
    return new Promise(resolve => {
      this.http.get('http://localhost:8000/api/v1/listviolationtoday',options)
        .map(res => res.json())
        .subscribe(data => {
          this.object = data;
          resolve(this.object);
        });
    });
  } 

  getDriverViolations(token,controlNumber) {
    if (this.object) {
      return Promise.resolve(this.object);
    }
    let headers = new Headers({ 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token});
    let options = new RequestOptions({ headers: headers });


    console.log(token);
    return new Promise(resolve => {
      this.http.get('http://localhost:8000/api/v1/violationdetails/' + controlNumber,options)
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

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    console.log(token);
    return new Promise(resolve => {
      this.http.get('http://localhost:8000/api/v1/violations',options)
        .map(res => res.json())
        .subscribe(data => {
          this.object = data;
          resolve(this.object);
        });
    });
  } 

  getSelectedDriver(token,licenseNumber) {
    console.log('this' + token);
    var object;
    if (this.object) {
       console.log('jelo');
      return Promise.resolve(this.object);
    }

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    return new Promise(resolve => {
      this.http.get('http://localhost:8000/api/v1/drivers/' + licenseNumber,options)
        .map(res => res.json())
        .subscribe(data => {
          object = data;
          resolve(object);
        });
    });
  } 


  addTicket(token, strDriverLicenseNumber, strRegistrationSticker, strPlateNumber, intVehicleTypeID,
                dblLatitude, dblLongitude, violations) {

     let headers = new Headers({
      'Authorization': 'Bearer ' + token });
     let options = new RequestOptions({ headers: headers });

     console.log('pota ' + token);
      let body = new FormData();
      body.append('strDriverLicenseNumber', strDriverLicenseNumber);
      body.append('strRegistrationSticker', strRegistrationSticker);
      body.append('strControlNumber', '444444');
      body.append('strPlateNumber', strPlateNumber);
      body.append('intVehicleTypeID', intVehicleTypeID);
      body.append('dblLatitude', dblLatitude);
      body.append('dblLongitude', dblLongitude);
      body.append('violations', violations);

    return new Promise(resolve => {
      this.http.post('http://localhost:8000/api/v1/driverviolations', body, options)
        .map(res => res.json())
        .subscribe(data => {
          this.object = data;
          resolve(this.object);
        });
    });
  } 
  


}
