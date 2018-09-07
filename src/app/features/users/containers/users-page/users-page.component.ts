import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {AddUser, EditUser, LoadUsers, RemoveUser} from './user-page.actions';
import {getUsersSelector, State} from '../../users.module.reducers';

@Component({
  selector: 'tt-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  protected users: Observable<User[]>;

  constructor(private store: Store<State>) {
    this.users = this.store.pipe(select(getUsersSelector));
  }

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
  }


  onAddUser(user: User) {
    this.store.dispatch(new AddUser(user));
  }

  onRemoveUser(user: User) {
    this.store.dispatch(new RemoveUser(user));
  }

  onEditUser(user: User) {
    this.store.dispatch(new EditUser(user));
  }
}
