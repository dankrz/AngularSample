import { User } from '../../models/user';
import { UsersActionsUnion, UsersActionTypes} from './users-page.actions';

export interface UsersPageState {
  users: User[];
  searchQuery: string;
}

const initialState: UsersPageState = {
  users: [],
  searchQuery: ''
};

export function usersPageReducer(
  state = initialState,
  action: UsersActionsUnion
): UsersPageState {
  switch (action.type) {
    case UsersActionTypes.LoadUsersSuccess: {
      return {
        ...state,
        users: action.payload
      };
    }

    case UsersActionTypes.ChangeSearchQuery: {
      return {
        ...state,
        searchQuery: action.payload
      };
    }

    case UsersActionTypes.ChangeSearchQuerySuccess: {
      return {
        ...state,
        users: action.payload
      };
    }

    case UsersActionTypes.AddUserSuccess:
    case UsersActionTypes.RemoveUserFail: {
      const matchedUsers = state.users.filter(
        (user: User) => user.id === action.payload.id
      );
      if (matchedUsers.length > 0) {
        return state;
      }

      return {
        ...state,
        users: [...state.users, action.payload]
      };
    }

    case UsersActionTypes.EditUserSuccess:
    case UsersActionTypes.EditUserFail: {
      const matchedUser = state.users.filter(
        (user: User) => user.id === action.payload.id
      )[0];
      if (!matchedUser) {
        return state;
      }

      const editedUsers = state.users.map(u => {
        if (u.id === action.payload.id) {
          return action.payload;
        } else {
          return u;
        }
      });

      return {
        ...state,
        users: editedUsers
      };
    }

    case UsersActionTypes.RemoveUserSuccess:
    case UsersActionTypes.AddUserFail: {
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id)
      };
    }

    default: {
      return state;
    }
  }
}

export const getUsers = (state: UsersPageState) => state.users;
export const getSearchQuery = (state: UsersPageState) => state.searchQuery;
