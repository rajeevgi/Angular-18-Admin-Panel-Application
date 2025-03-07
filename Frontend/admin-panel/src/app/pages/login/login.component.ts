import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = new User();

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin(){
    this.apiService.superAdminLogin(this.user).subscribe(( res : any) => {
      if(this.user.role === 'user'){
        alert('User Logged in Successfully...');
        sessionStorage.setItem('User-data', JSON.stringify(res.user));
        this.router.navigateByUrl('');
      } else if(this.user.role === 'admin'){
        alert('Admin Logged in Successfully...');
        sessionStorage.setItem('Admin-data', JSON.stringify(res.user));
        this.router.navigateByUrl('/app-dashboard');
      } else if(this.user.role === 'superadmin'){
        alert('Super Admin Logged in Successfully...');
        sessionStorage.setItem('SuperAdmin-data', JSON.stringify(res.user));
        this.router.navigateByUrl('/app-admin-dashboard');
      } else {
        alert('Invalid Credentials!');
      }
    });
  }
}
