import { userType } from "../../customTypes";
import { ActionType } from "./userActionTypes";

interface SignInAction {
  type: ActionType.SIGN_IN;
  payload: userType;
}

interface SignOutAction {
  type: ActionType.SIGN_OUT;
  payload: null;
}

export type Action = SignInAction | SignOutAction;
