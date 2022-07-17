import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string= "";
  constructor( private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // aktif bir oturum kullanıcısı varsa kullanıcıyı profil sayfasına yönlendiricez
    if(this.authenticationService.currentUserValue?.id){
      this.router.navigate(['/profile']);
      return;
    }
  }

  login(){
    this.authenticationService.register(this.user).subscribe(data =>{
      this.router.navigate(['/login']);
    }, err =>{
      this.errorMessage = 'Username or password incorrect.';
    })
  }

}
