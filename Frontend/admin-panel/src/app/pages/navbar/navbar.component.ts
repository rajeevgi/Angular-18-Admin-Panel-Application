import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  role: string = ''; 

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    
  }

  logout(){
    this.apiService.logout().subscribe(( res : any ) => {
      alert("Logout Successfully...");
      this.router.navigateByUrl('/app-login');
    });
  }
}
