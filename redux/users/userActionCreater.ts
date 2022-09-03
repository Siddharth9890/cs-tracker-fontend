import { Dispatch } from "redux";
import { userType } from "../../customTypes";
import { Action } from "./userActions";
import { ActionType } from "./userActionTypes";

export const signIn = (user: userType) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SIGN_IN,
      payload: user,
    });
  };
};

export const signOut = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SIGN_OUT,
      payload: null,
    });
  };
};

export const increaseCountOfQuestion = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.INCREASE_TOTAL_QUESTIONS_SOLVED,
      payload: null,
    });
  };
};
