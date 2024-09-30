import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../user.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './search-user.component.html',
})
export class SearchUserComponent {
  name: string = '';
  surname: string = '';
  id: string = '';
  users: IUser[] = [];
  searchAttempted: boolean = false;

  constructor(private userService: UserService) {}

  searchUsers() {
    this.userService
      .findUsersByNameAndSurname(this.name, this.surname)
      .subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          this.users = response.users;
          this.searchAttempted = true;
          console.log('Users:', this.users);
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.users = [];
          this.searchAttempted = true;
        },
      });
  }

  searchUserById() {
    this.userService.getUser(this.id).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        this.users = [response.existingUser];
        this.searchAttempted = true;
      },
      error: (err) => {
        console.error('Error fetching user by ID:', err);
        this.users = [];
        this.searchAttempted = true;
      },
    });
  }
}
