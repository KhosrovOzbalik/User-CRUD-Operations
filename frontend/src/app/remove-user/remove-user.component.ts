import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Import the UserService
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remove-user',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CommonModule],
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css'],
})
export class RemoveUserComponent {
  id: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  removeUser() {
    if (!this.id) {
      this.errorMessage = 'Please provide a User ID to remove!';
      return;
    }

    this.userService.deleteUser(this.id).subscribe({
      next: (response) => {
        console.log('User removed successfully:', response);
        this.successMessage = 'User removed successfully!';
        this.errorMessage = '';
        this.resetForm();
      },
      error: (error) => {
        console.error('Error removing user:', error);
        this.errorMessage = 'Error removing user!';
        this.successMessage = '';
      },
    });
  }

  resetForm() {
    this.id = '';
  }
}
