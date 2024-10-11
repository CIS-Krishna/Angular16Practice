import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
type USER = {
  id: string,
  name: string,
  avatar: string
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({required:true}) user!: USER;
  @Input({required:true}) selected!: boolean;
  @Output() select = new EventEmitter();

  users = DUMMY_USERS[0];

  userSelected(user:USER){
    this.select.emit(user.id);
  }
}
