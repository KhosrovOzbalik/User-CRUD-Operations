import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.userData;
    });
  }
}
