import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

const API_URL = `${environment.BASE_URL}/api/authentication/`

@Injectable({
  providedIn: 'root'
})
// sınıfın dependency injecktion olarak diğer sınıflarda, componentlarda kullanılabileceğini belirtir
export class AuthenticationService {
  public currentUser: Observable<User>; // bir kullanıcı oturum açtığında ya da kapattığında reaktif olarak güncellemek için
  public currentUserSubject: BehaviorSubject<User>; // diğer bileşenlerle paylaşılması gereken değeri tutat
  /* RXJS
  observable ile dinleyiciler, listenarlar eventleri dinlerler ve eventleri bildirim olark gönderirler bu dinleyiciler de olatyları kolayca yakalarlar
  oturum açma işlemini diğer listenarlara bir event olarak göndericez
  */

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if(storageUserAsStr){
      storageUser = JSON.parse(storageUserAsStr);
    }
    // current userı kontrol ediyoruz ve varsa onu emutare gonderiyoruz
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(API_URL + "sign-in", user).pipe(
      map(response => {
        // login işleminde gelen sonuç varsa onu local-stprage değeri olarak ayarlıcaz
        if(response){
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    )
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(API_URL + "sign-up", user);
  }

  logOut(){
    localStorage.removeItem('currentUser'); // ls'i temizliyoruz
    this.currentUserSubject.next(new User()); // uygulamayı bilgilendiriyoruz boş kullanıcıyla
  }

}
