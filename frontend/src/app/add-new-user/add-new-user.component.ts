import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../user.service';
import { IUser } from '../user.interface';
import { FormsModule } from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './add-new-user.component.html',
})
export class AddNewUserComponent {
  name: string = '';
  surname: string = '';
  age: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  userCreated() {
    const newUser: IUser = {
      name: this.name,
      surname: this.surname,
      age: this.age ?? 0,
    };

    this.userService.createUser(newUser).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.successMessage = 'User created successfully!';
        this.errorMessage = '';
        this.resetForm();
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.errorMessage = 'Error creating user!';
        this.successMessage = '';
        this.cd.detectChanges();
      },
    });
  }

  resetForm() {
    this.name = '';
    this.surname = '';
    this.age = null;
  }
}
