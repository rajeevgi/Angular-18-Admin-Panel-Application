import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    password: '',
  };

  id!: number;

  constructor(
    private apiService : ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user ID from the URL
    this.id = this.route.snapshot.params['id'];

    // Fetch user details and populate the form
    this.apiService.getUserById(this.id).subscribe(
      (data: any) => {
        this.user = data;
      },
      (error: any) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  updateUser() {
    this.apiService.updateUser(this.id, this.user).subscribe(
      (res: any) => {
        alert('User updated successfully');
        this.router.navigate(['/app-dashboard']); // Redirect to dashboard after update
      },
      (error: any) => {
        console.error('Error updating user:', error);
        alert('Failed to update user');
      }
    );
  }
}
