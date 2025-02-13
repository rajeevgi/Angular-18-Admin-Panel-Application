import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  adminList : any[] = [];

  constructor(private apiService : ApiService, private router : Router) {}

  ngOnInit(): void {
    this.apiService.getAdmins().subscribe(( res : any ) => {
      this.adminList = res;
    })
  }

  onUpdateAdmin(id : number){
    this.router.navigate(['/app-admin-update', id]);
  }

  onDeleteAdmin(id : number){
    if(confirm('Are you sure want to delete this admin?')){
      this.apiService.deleteAdmin(id).subscribe(( res : any ) => {
        this.adminList = this.adminList.filter( admin => admin.id !== id);
        alert("Admin Deleted Successfully...");
      });
    };
  }
}
