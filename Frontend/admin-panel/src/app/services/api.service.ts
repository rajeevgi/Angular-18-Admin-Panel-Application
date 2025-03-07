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

  superAdminLogin(data : any){
    return this.http.post(`${this.adminUrl}/login`, data, { withCredentials : true });
  }

  adminLogin(data : any ){
    return this.http.post(`${this.adminUrl}/login`, data , { withCredentials : true });
  }

  userLogin(data : any){
    return this.http.post(`${this.userUrl}/loginUser`, data, { withCredentials : true });
  }


  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }
  

  // Users crud operations

  getUsers(): Observable<any> {
    return this.http.get(`${this.userUrl}/listAllUsers`, { withCredentials : true });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/getUserById/${id}`, { withCredentials : true });
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.userUrl}/saveUser`, user, { withCredentials : true });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.userUrl}/updateUser/${id}`, user, { withCredentials : true });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/deleteUser/${id}`, { withCredentials : true });
  }

  // Admins crud operations

  registerAdmin(data : any) : Observable<any>{
    return this.http.post(`${this.adminUrl}/register`, data, { withCredentials : true });
  }

  getAdmins(): Observable<any> {
    return this.http.get(`${this.adminUrl}/listAllAdmins`, { withCredentials: true });
  }

  getAdminById(id: number): Observable<any> {
    return this.http.get(`${this.adminUrl}/getAdminById/${id}`, { withCredentials : true });
  }

  addAdmin(admin: any): Observable<any> {
    return this.http.post(`${this.adminUrl}/saveAdmin`, admin, { withCredentials : true });
  }

  updateAdmin(id: number, admin: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/updateAdmin/${id}`, admin, { withCredentials : true });
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/deleteAdmin/${id}`, { withCredentials : true });
  }
}
