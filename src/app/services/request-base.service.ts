import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export abstract class RequestBaseService {

  //değeri değişir değişmez yakalıcaz
  protected currentUser: User = new User;

  protected constructor(protected authenticationService: AuthenticationService, protected http: HttpClient) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  get getHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.currentUser?.token,
        "Content-Type": "application/json; charset=UTF-8"
      }
    );
  }

}
