import {User} from '../../models/user';
import {UsersActionsUnion, UsersActionTypes} from './user-page.actions';

export interface UsersPageState {
  users: User[];
}

const initialState: UsersPageState = {
  users: [],
};


export function usersPageReducer(
  state = initialState,
  action: UsersActionsUnion
): UsersPageState {
  switch (action.type) {

    case UsersActionTypes.LoadUsersSuccess: {
      return {
        users: action.payload,
      };
    }

    case UsersActionTypes.AddUserSuccess:
    case UsersActionTypes.RemoveUserFail: {
      const matchedUsers = state.users.filter((user: User) => user.id === action.payload.id);
      if (matchedUsers.length > 0) {
        return state;
      }

      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }

    case UsersActionTypes.RemoveUserSuccess:
    case UsersActionTypes.AddUserFail: {
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }
}

export const getUsers = (state: UsersPageState) => state.users;
