import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http : HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserById(id : number) : Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  addUser(user : any) : Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  updateUser(id : number, user : any) : Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id : number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
}
