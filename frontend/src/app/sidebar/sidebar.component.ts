import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { State } from '../state';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  State = State;

  @Output() stateChange = new EventEmitter<State>();

  emitStateChange(state: State): void {
    this.stateChange.emit(state);
  }
}
