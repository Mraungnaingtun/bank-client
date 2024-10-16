import { Component } from '@angular/core';
import { UserApiService } from '../../services/user/user-service.service';
import {MatListModule} from '@angular/material/list';
import { User } from '../../model/user.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatListModule,AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  users!: Observable<User[]>;

  constructor(private userApiService: UserApiService) { 
    
  }

  ngOnInit(): void {
    // this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userApiService.getAllUsers();
  }

  

}
