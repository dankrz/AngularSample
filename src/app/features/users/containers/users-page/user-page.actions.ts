import {Action} from '@ngrx/store';
import {User} from '../../models/user';

export enum UsersActionTypes {
  AddUser = '[Users] Add User',
  AddUserSuccess = '[Users] Add User Success',
  AddUserFail = '[Users] Add User Fail',
  EditUser = '[Users] Edit User',
  EditUserSuccess = '[Users] Edit User Success',
  EditUserFail = '[Users] Edit User Fail',
  RemoveUser = '[Users] Remove User',
  RemoveUserSuccess = '[Users] Remove User Success',
  RemoveUserFail = '[Users] Remove User Fail',
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersFail = '[Users] Load Users Fail',
}
export class AddUser implements Action {
  readonly type = UsersActionTypes.AddUser;

  constructor(public payload: User) {}
}

export class AddUserSuccess implements Action {
  readonly type = UsersActionTypes.AddUserSuccess;

  constructor(public payload: User) {}
}

export class AddUserFail implements Action {
  readonly type = UsersActionTypes.AddUserFail;

  constructor(public payload: User) {}
}

export class EditUser implements Action {
  readonly type = UsersActionTypes.EditUser;

  constructor(public payload: User) {}
}

export class EditUserSuccess implements Action {
  readonly type = UsersActionTypes.EditUserSuccess;

  constructor(public payload: User) {}
}

export class EditUserFail implements Action {
  readonly type = UsersActionTypes.EditUserFail;

  constructor(public payload: User) {}
}

export class RemoveUser implements Action {
  readonly type = UsersActionTypes.RemoveUser;

  constructor(public payload: User) {}
}

export class RemoveUserSuccess implements Action {
  readonly type = UsersActionTypes.RemoveUserSuccess;

  constructor(public payload: User) {}
}

export class RemoveUserFail implements Action {
  readonly type = UsersActionTypes.RemoveUserFail;

  constructor(public payload: User) {}
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UsersActionTypes.LoadUsersSuccess;

  constructor(public payload: User[]) {}
}

export class LoadUsersFail implements Action {
  readonly type = UsersActionTypes.LoadUsersFail;

  constructor(public payload: any) {}
}

export type UsersActionsUnion =
  | AddUser
  | AddUserSuccess
  | AddUserFail
  | EditUser
  | EditUserSuccess
  | EditUserFail
  | RemoveUser
  | RemoveUserSuccess
  | RemoveUserFail
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail;
