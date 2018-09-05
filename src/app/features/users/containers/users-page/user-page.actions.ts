import {Action} from '@ngrx/store';
import {User} from '../../models/user';

export enum UsersActionTypes {
  AddUser = '[Users] Add User',
  AddUserSuccess = '[Users] Add User Success',
  AddUserFail = '[Users] Add User Fail',
  RemoveUser = '[Users] Remove User',
  RemoveUserSuccess = '[Users] Remove User Success',
  RemoveUserFail = '[Users] Remove User Fail',
  Load = '[Users] Load',
  LoadSuccess = '[Users] Load Success',
  LoadFail = '[Users] Load Fail',
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

export class Load implements Action {
  readonly type = UsersActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = UsersActionTypes.LoadSuccess;

  constructor(public payload: User[]) {}
}

export class LoadFail implements Action {
  readonly type = UsersActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type UsersActionsUnion =
  | AddUser
  | AddUserSuccess
  | AddUserFail
  | RemoveUser
  | RemoveUserSuccess
  | RemoveUserFail
  | Load
  | LoadSuccess
  | LoadFail;
