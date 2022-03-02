import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { UserUpdateInterface } from 'src/app/interfaces/user-update-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDialogService {

  constructor(private httpClient: HttpClient) { }
  
  creatUser(user: UserInterface): Observable<UserInterface>{
    return this.httpClient.post<UserInterface>(`${environment.url}users`, user);
  }

  updateUser(id: string,user: UserUpdateInterface): Observable<UserInterface>{
    return this.httpClient.patch<UserInterface>(`${environment.url}users/${id}`, user);
  }

  deleteUser(userId: string){
    return this.httpClient.delete(`${environment.url}users/${userId}`);
  }
}
