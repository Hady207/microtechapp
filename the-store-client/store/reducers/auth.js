import { LOGIN, LOGOUT } from "../actions/auth";

const initialObj = {
  id: "",
  username: "",
  is_staff: "",
};

const authReducer = (state = initialObj, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };

    case LOGOUT:
      return { ...state, username: "", is_staff: "" };

    default:
      return state;
  }
};

export default authReducer;
