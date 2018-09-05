import {ActionReducerMap} from '@ngrx/store';
import {usersReducer, UsersState} from './containers/users-page/user-page.reducer';


export interface UsersModuleState {
  users: UsersState;
}


export const reducers: ActionReducerMap<UsersModuleState> = {
  users: usersReducer,
};
