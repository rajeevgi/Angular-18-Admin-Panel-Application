import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../model/user';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  User : User = new User();

  constructor(private apiService : ApiService, private router : Router){}

  onRegister() {
    console.log('Registering:', User, 'Role:', this.User.role ? 'Admin' : 'User');
    if (this.User.role === 'admin'){
      this.apiService.registerAdmin(this.User).subscribe(( res : any) => {
        alert('Admin Registered Successfully...');
        this.router.navigate(["/app-login"]);
      });
    } else if(this.User.role === 'user'){
      this.apiService.registerUser(this.User).subscribe(( res : any) => {
        alert('User Registered Successfully...');
        this.router.navigate(["/app-login"]);
      });
    }else {
      alert('Something went wrong!');
      this.router.navigate(["/app-register"])
    }
  }
}
