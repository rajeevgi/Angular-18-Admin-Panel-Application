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

  userType: string = 'user'; // Default to User

  User : User = new User();

  constructor(private apiService : ApiService, private router : Router){}

  onRegister() {
    console.log('Registering:', User, 'Role:', this.userType ? 'Admin' : 'User');
    if ( this.userType === 'superadmin' || this.userType === 'admin'){
      this.apiService.registerAdmin(Credential).subscribe(( res : any) => {
        
      });
    }
  }
}
