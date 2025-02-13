import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-update',
  imports: [FormsModule],
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export class AdminUpdateComponent implements OnInit {

  admin : any = {
    username : '',
    password : ''
  }

  id !: number;

  constructor(private apiService : ApiService, private router : Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.apiService.getAdminById(this.id).subscribe(( res : any ) => {
      this.admin = res;
    });
  }

  updateAdmin(){
    this.apiService.updateAdmin(this.id, this.admin).subscribe(( res : any ) => {
      this.admin = res;
      alert("Admin Updated Successfully...");
      this.router.navigate(['/app-admin-dashboard']);
    });
  }
}
