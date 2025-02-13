import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isAdmin: boolean = false; // Default to User

  user = {
    email: '',
    username: '',
    password: ''
  };

  onLogin() {
    console.log('Logging in:', this.user, 'Role:', this.isAdmin ? 'Admin' : 'User');
    // Add API call here for login authentication
  }
}
