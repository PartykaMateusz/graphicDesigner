import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  validToken: false
};

const booleanActionPayload = payload => {
  if (!isEmpty(payload)) {
    return true;
  } else {
    return false;
  }
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
