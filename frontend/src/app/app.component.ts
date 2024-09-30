import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { State } from './state';
import { RemoveUserComponent } from './remove-user/remove-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    UserListComponent,
    AddNewUserComponent,
    RemoveUserComponent,
    SearchUserComponent,
    UpdateUserComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  State = State;

  state: State = State.UserList;

  onSidebarButton(newState: State) {
    this.state = newState;
  }
}
