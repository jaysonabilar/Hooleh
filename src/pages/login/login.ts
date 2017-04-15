import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiService } from '../../providers/api-service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ApiService]
})
export class LoginPage {

  login = {
  	username: '',
  	password: '',
  };

  token : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService) {
    this.token = '';
  }

  loginUser(username, password){
    
    this.apiService.login(username,password)
      .then(data => { 
        this.token = data.token;
    });
  
    console.log(username);
    console.log(password);
    console.log(this.token);

    var loginDetails = { 
      'username': username, 
      'password': password, 
      'token': this.token
    };

    window.localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
     
    if(this.token.length > 1){
       this.navCtrl.setRoot(HomePage);
    }
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
