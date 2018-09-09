import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import {
  AddUser,
  EditUser,
  LoadUsers,
  RemoveUser,
  ChangeSearchQuery
} from './users-page.actions';
import {
  getUsersSelector,
  State,
  getSearchQuerySelector
} from '../../users.module.reducers';

@Component({
  selector: 'tt-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  protected users: Observable<User[]>;
  protected searchQuery: Observable<string>;

  constructor(private store: Store<State>) {
    this.users = this.store.pipe(select(getUsersSelector));
    this.searchQuery = this.store.pipe(select(getSearchQuerySelector));
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

  onSearchQueryChange(query: string) {
    this.store.dispatch(new ChangeSearchQuery(query));
  }
}
