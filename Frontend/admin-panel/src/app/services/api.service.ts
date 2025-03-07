import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private baseUrl = "http://localhost:5000/api";

  private adminUrl = 'http://localhost:5000/api/admins';
  
  private userUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient, private router : Router) {}

  superAdminLogin(credentials : any){
    return this.http.post(`${this.adminUrl}/login`, credentials);
  }

  adminLogin(credentials : any ){
    return this.http.post(`${this.adminUrl}/login`, credentials);
  }

  userLogin(credentials : any){
    return this.http.post(`${this.userUrl}/loginUser`, credentials);
  }

  checkSession() : Observable<any>{
    return this.http.get(`${this.baseUrl}/session`);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }
  

  // Users crud operations

  getUsers(): Observable<any> {
    return this.http.get(`${this.userUrl}/listAllUsers`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/getUserById/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.userUrl}/saveUser`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.userUrl}/updateUser/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/deleteUser/${id}`);
  }

  // Admins crud operations

  registerAdmin(data : any) : Observable<any>{
    return this.http.post(`${this.adminUrl}/register`, data);
  }

  getAdmins(): Observable<any> {
    return this.http.get(`${this.adminUrl}/listAllAdmins`, {withCredentials: true});
  }

  getAdminById(id: number): Observable<any> {
    return this.http.get(`${this.adminUrl}/getAdminById/${id}`);
  }

  addAdmin(admin: any): Observable<any> {
    return this.http.post(`${this.adminUrl}/saveAdmin`, admin);
  }

  updateAdmin(id: number, admin: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/updateAdmin/${id}`, admin);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/deleteAdmin/${id}`);
  }
}
