import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import {
  AddUser,
  AddUserFail,
  AddUserSuccess,
  EditUser,
  LoadUsersFail,
  LoadUsersSuccess,
  RemoveUser,
  RemoveUserFail,
  RemoveUserSuccess,
  UsersActionTypes,
  EditUserSuccess,
  EditUserFail,
  ChangeSearchQuery,
  LoadUsers,
  ChangeSearchQuerySuccess,
  ChangeSearchQueryFail
} from './user-page.actions';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
  debounceTime,
  filter
} from 'rxjs/operators';
import { User } from '../../models/user';
import {
  getUsersSelector,
  State,
  getSearchQuerySelector
} from '../../users.module.reducers';

@Injectable()
export class UsersEffects {
  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActionTypes.LoadUsers),
    switchMap((action: LoadUsers) =>
      this.userService.getAll().pipe(
        map((users: User[]) => new LoadUsersSuccess(users)),
        catchError(error => of(new LoadUsersFail(error)))
      )
    )
  );

  // @Effect()
  // changeSearchQuery$: Observable<Action> = this.actions$.pipe(
  //   ofType(UsersActionTypes.ChangeSearchQuery),
  //   debounceTime(300),
  //   withLatestFrom(this.store.pipe(select(getUsersSelector))),
  //   map(([action, users]: [ChangeSearchQuery, User[]]) => [
  //     action.payload,
  //     users
  //   ]),
  //   switchMap(
  //     ([searchQuery, users]: [string, User[]]) =>
  //       !Array.isArray(users)
  //         ? <Observable<Action>>(
  //             of(new ChangeSearchQueryFail('Invalid parameters'))
  //           )
  //         : <Observable<Action>>(
  //             of(
  //               new ChangeSearchQuerySuccess(
  //                 users.filter(
  //                   u =>
  //                     (searchQuery || '') === '' ||
  //                     (u.name || '').startsWith(searchQuery)
  //                 )
  //               )
  //             )
  //           )
  //   )
  // );

  @Effect()
  addUserToUsers$: Observable<Action> = this.actions$.pipe(
    ofType<AddUser>(UsersActionTypes.AddUser),
    withLatestFrom(this.store.pipe(select(getUsersSelector))),
    map(([action, users]: [AddUser, User[]]) => [action.payload, users]),
    mergeMap(([user, users]: [User, User[]]) =>
      this.userService
        .add({
          ...user,
          id: this.userService.findNextId(users)
        })
        .pipe(
          map((addedUser: User) => new AddUserSuccess(addedUser)),
          catchError(() => of(new AddUserFail(user)))
        )
    )
  );

  @Effect()
  editUserToUsers$: Observable<Action> = this.actions$.pipe(
    ofType<EditUser>(UsersActionTypes.EditUser),
    map((action: EditUser) => action.payload),
    mergeMap((user: User) =>
      this.userService.edit(user).pipe(
        map((addedUser: User) => new EditUserSuccess(addedUser)),
        catchError(() => of(new EditUserFail(user)))
      )
    )
  );

  @Effect()
  removeUserFromUsers$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveUser>(UsersActionTypes.RemoveUser),
    map(action => action.payload),
    mergeMap(user =>
      this.userService.remove(user).pipe(
        map(() => new RemoveUserSuccess(user)),
        catchError(() => of(new RemoveUserFail(user)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<State>
  ) {}
}
