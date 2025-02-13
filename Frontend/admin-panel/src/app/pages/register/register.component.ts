import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isAdmin: boolean = false; // Default to User

  user = {
    name: '',
    email: '',
    username: '',
    password: ''
  };

  onRegister() {
    console.log('Registering:', this.user, 'Role:', this.isAdmin ? 'Admin' : 'User');
    // Add API call here for registration
  }
}
