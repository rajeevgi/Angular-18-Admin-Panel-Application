import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  imports: [FormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {

  admin : any = {
    username : '',
    password : ''
  }

  constructor(private apiService : ApiService, private router : Router) {}

  saveAdmin(){
    this.apiService.addAdmin(this.admin).subscribe(( res : any ) => {
      this.admin = res;
      alert("Admin Added Successfully...");
      this.router.navigate(['/app-admin-dashboard']);
    });
  }
}
