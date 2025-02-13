import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  role : string = '';   // Stores the logged-in user role.

  constructor(private apiService : ApiService) {  }

  ngOnInit(): void {
    this.apiService.checkSession().subscribe(( session : any) => {
      this.role = session.role;
    });
  }

  logout(){
    this.apiService.logout();
  }
}
