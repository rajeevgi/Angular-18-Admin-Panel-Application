import { Component } from '@angular/core';
import { User } from '../../model/user';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-data',
  imports: [RouterLink],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {

  user : User = new User();

  constructor(private apiService : ApiService, private router : Router){}

  getUserData(id : number){
    this.apiService.getUserById(id).subscribe(( res : any) => {

    });
  }
}
