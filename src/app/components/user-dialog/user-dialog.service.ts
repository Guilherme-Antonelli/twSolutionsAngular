import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDialogService {

  constructor(private httpClient: HttpClient) { }
  
  creatUser(user: UserInterface): Observable<UserInterface>{
    return this.httpClient.post<UserInterface>(`${environment.url}users`, user);
  }
}
