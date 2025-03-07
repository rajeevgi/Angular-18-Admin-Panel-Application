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
 
  userType : string = 'user';

  user : User = new User();

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
    console.log('Logging in:', this.user);
    if (this.userType === 'user') {
      alert('User Loginned Successfully...');
      // sessionStorage.setItem('User-Data', JSON.stringify(this.user));
      localStorage.setItem('User-Type', JSON.stringify(this.userType));
      this.router.navigateByUrl('');
    } else if (this.userType === 'admin') {
      alert('Admin Loginned Successfully...');
      // sessionStorage.setItem('Admin-Data ', JSON.stringify(this.user));
      localStorage.setItem('User-Type', JSON.stringify(this.userType));
      this.router.navigateByUrl('/app-dashboard');
    } else if (this.userType === 'superadmin') {
      alert('Super Admin loginned Successfully...');
      // sessionStorage.setItem('SuperAdmin-Data ', JSON.stringify(this.user));
      localStorage.setItem('User-Type', JSON.stringify(this.userType));
      this.router.navigateByUrl('/app-admin-dashboard');
    } else {
      alert('Invalid Credentials!');
    }
  }
}
