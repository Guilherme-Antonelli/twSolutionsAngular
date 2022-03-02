import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTableService {

  constructor(private readonly http: HttpClient) { }

  getUsers(skip: number, take: number, order: number, name?: string): Observable<UserInterface>{
    const skipTake = {skip, take, order, name} 
    return this.http.post<UserInterface>(`${environment.url}users/pagination`, skipTake);
  }
}
