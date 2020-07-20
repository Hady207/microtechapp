import { useReducer } from "react";

const initalObj = {
  id: "",
  username: "",
  is_staff: "",
};

const UserReducer = (init = initalObj) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case Login:
        return { ...state, ...action.payload };
      default:
        state;
    }
  };
  const [state, dispatch] = useReducer(reducer, init);
  return [state, dispatch];
};

export default UserReducer;
