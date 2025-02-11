import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  userList : any[] = [];

  constructor(private apiService : ApiService, private router : Router) { }; 

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      console.log(data);
      this.userList = data;
    });
  }

  onDeleteUser(id : number) {
    if(confirm("Are you sure you want delete this user ?")){
      this.apiService.deleteUser(id).subscribe((res : any) => {
        this.userList = this.userList.filter(user => user.id !== id);
        alert('User deleted successfully');
      });
    };
  }

  onUpdateUser(id : number) {
    this.router.navigate(['/app-update-user', id]);
  }
  
}
