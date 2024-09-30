import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Import the UserService
import { IUser } from '../user.interface'; // Import the IUser interface
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  id: string = '';
  name: string = '';
  surname: string = '';
  age: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  userUpdated() {
    const updatedUser: Partial<IUser> = {};

    if (this.name) updatedUser.name = this.name;
    if (this.surname) updatedUser.surname = this.surname;
    if (this.age !== null && this.age !== undefined) updatedUser.age = this.age;

    if (Object.keys(updatedUser).length === 0) {
      this.errorMessage = 'Please provide at least one field to update!';
      return;
    }

    this.userService.updateUser(this.id, updatedUser).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        this.successMessage = 'User updated successfully!';
        this.errorMessage = '';
        this.resetForm();
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.errorMessage = 'Error updating user!';
        this.successMessage = '';
      },
    });
  }

  resetForm() {
    this.id = '';
    this.name = '';
    this.surname = '';
    this.age = null;
  }
}
