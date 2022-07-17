import { Component } from '@angular/core';
import {User} from "./models/user.model";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "./models/role.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-book-seller';

  currentUser: User = new User();

  constructor(private authenticationService:AuthenticationService, private router: Router) {
    //current user da bir değişiklik olduğunda aniden tetiklenecektir.
    this.authenticationService.currentUser.subscribe(data =>{
      this.currentUser = data;
    })
  }

  isAdmin(){
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut(){
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }
}
