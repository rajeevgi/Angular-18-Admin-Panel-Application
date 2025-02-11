import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  user: any = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private apiService : ApiService, private router : Router) {};

  saveUser(){
    this.apiService.addUser(this.user).subscribe((res : any) => {
      this.user = res;
      alert('User added successfully'); 
      this.router.navigate(['/app-dashboard']);
    });
  }
}
