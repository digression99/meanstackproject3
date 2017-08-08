import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken : any;
  user : any;

  constructor(private http:Http) { }

  registerUser (user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register',
      user, {headers:headers}).map(res => res.json());
  }

  authenticateUser (user) { // successful -> token should be stored.
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate',
      user, {headers:headers}).map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();

    // send token with Authrization.
    headers.append('Authorization', this.authToken);

    headers.append('Content-Type', 'application/json');
    // for heroku, remove http://localhost:3000/ ...
    return this.http.get('users/profile', {headers:headers}).map(res => res.json());
  }

  storeUserData(token, user) {
    // angular jwt -> id_token 을 자동으로 검색.
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() { // class property
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    // id_token으로 해야 먹힌다
    // -> default option이 바뀐 것.
    return tokenNotExpired('id_token');
  }

}
