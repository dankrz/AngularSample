import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';


export interface AppState {
  router: RouterReducerState;
}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
