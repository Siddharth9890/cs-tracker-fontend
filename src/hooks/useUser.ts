import { useDispatch, useSelector } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";

import { userType } from "../../customTypes";
import { actionCreators } from "../redux/users";
import { RootState } from "../redux/users/userReducer";

const useUser = (): [
  userType,
  (user: userType) => (dispatch: Dispatch<Action>) => void,
  () => (dispatch: Dispatch<Action>) => void,
  () => (dispatch: Dispatch<Action>) => void
] => {
  const { user } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const { signOut, signIn, increaseCountOfQuestion } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return [user, signIn, signOut, increaseCountOfQuestion];
};

export default useUser;
