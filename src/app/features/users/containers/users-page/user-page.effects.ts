import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../services/user.service';
import {Observable, of} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import {
  AddUser,
  AddUserFail,
  AddUserSuccess,
  LoadUsersFail,
  LoadUsersSuccess, RemoveUser,
  RemoveUserFail,
  RemoveUserSuccess,
  UsersActionTypes
} from './user-page.actions';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {User} from '../../models/user';
import {getUsersSelector, State} from '../../users.module.reducers';

@Injectable()
export class UsersEffects {


  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActionTypes.LoadUsers),
    switchMap(() =>
      this.userService.getAll().pipe(
        map((users: User[]) => new LoadUsersSuccess(users)),
        catchError(error => of(new LoadUsersFail(error)))
      )
    )
  );

  @Effect()
  addUserToUsers$: Observable<Action> = this.actions$.pipe(
    ofType<AddUser>(UsersActionTypes.AddUser),
    withLatestFrom(this.store.pipe(select(getUsersSelector))),
    map(([action, users]: [AddUser, User[]]) => [action.payload, users]),
    mergeMap(([user, users]: [User, User[]]) =>
      this.userService.add({
        ...user,
        id: this.userService.findNextId(users)
      }).pipe(
        map((addedUser: User) => new AddUserSuccess(addedUser)),
        catchError(() => of(new AddUserFail(user)))
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

  constructor(private actions$: Actions, private userService: UserService, private store: Store<State>) {}
}
