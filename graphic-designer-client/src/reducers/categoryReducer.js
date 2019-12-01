import { GET_CATEGORIES, GET_FAVOURITE_CATEGORIES } from "../actions/types";

const initialState = {
  categories: {},
  favouriteCategories: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_FAVOURITE_CATEGORIES:
      return {
        ...state,
        favouriteCategories: action.payload
      };
    default:
      return state;
  }
}
