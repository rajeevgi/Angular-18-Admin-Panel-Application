import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private userUrl = 'http://localhost:5000/api/users';

  private adminUrl = 'http://localhost:5000/api/admins';

  constructor(private http: HttpClient, private router : Router) {}

  login(credentials : any){
    return this.http.post('/api/login', credentials);
  }

  checkSession(){
    return this.http.get('/api/session');
  }

  logout(){
    this.http.post('/api/logout', {}).subscribe(() => {
      this.router.navigate(['/app-login']);
    });
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
  getAdmins(): Observable<any> {
    return this.http.get(`${this.adminUrl}/listAllAdmins`);
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
