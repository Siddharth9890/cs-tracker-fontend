import { userType } from "../../../customTypes";
import { Action } from "./userActions";
import { ActionType } from "./userActionTypes";
import { combineReducers } from "redux";

const initialState = {
  user_name: "",
  email: "",
  role: "user",
  total_number_of_questions_done_by_user: 0,
  createdAt: new Date(),
  deletedAt: new Date(),
  refresh_token: "",
  accessToken: "",
  multi_factor_enabled: false,
  verified: false,
  updatedAt: new Date(),
  user_id: "",
  account_status: "",
  secret: "",
  secret_backup: "",
};

const userReducer = (
  state: userType = initialState,
  action: Action
): userType => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, ...action.payload };
    case ActionType.SIGN_OUT:
      return initialState;
    case ActionType.INCREASE_TOTAL_QUESTIONS_SOLVED:
      return {
        ...state,
        total_number_of_questions_done_by_user:
          Number(state.total_number_of_questions_done_by_user) + Number(1),
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
