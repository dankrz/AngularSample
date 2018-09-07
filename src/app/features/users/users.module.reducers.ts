import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import { getUsers, usersPageReducer, UsersPageState, getSearchQuery } from './containers/users-page/user-page.reducer';
import {AppState} from '../../app.module.reducers';


export interface UsersModuleState  {
  usersPage: UsersPageState;
}

export interface State extends AppState {
  userModule: UsersModuleState;
}

export const reducers: ActionReducerMap<UsersModuleState> = {
  usersPage: usersPageReducer,
};

export const getUsersModuleState = createFeatureSelector<State, UsersModuleState>('userModule');

export const getUsersPageState = createSelector(
  getUsersModuleState,
  (state: UsersModuleState) => state.usersPage
);



export const getUsersSelector = createSelector(
  getUsersPageState,
  getUsers
);

export const getSearchQuerySelector = createSelector(
  getUsersPageState,
  getSearchQuery
);
