import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  role : string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    if(sessionStorage.getItem('SuperAdmin-data')){
      this.role = 'superadmin';
    }else if(sessionStorage.getItem('Admin-data')){
      this.role = 'admin';
    } else if(sessionStorage.getItem('User-data')){
      this.role = 'user';
    } else {
      this.role = null;
    }
  }

  logout(){
    this.apiService.logout().subscribe(( res : any ) => {
      alert("Logout Successfully...");
      sessionStorage.clear();
      this.role = null;
      this.router.navigateByUrl('/app-login');
    });
  }
}
