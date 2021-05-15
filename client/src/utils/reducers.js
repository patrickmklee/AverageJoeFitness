import { useReducer } from "react";
import {
    ADD_TO_MEAL,
    UPDATE_FOODS_RESULTS,
    UPDATE_SEARCH_CRITERIA
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {

    case ADD_TO_MEAL:
      return {
        ...state,
        mealOpen: true,
        meal: [...state.meal, action.food],
      };
    case UPDATE_SEARCH_CRITERIA:
    return {
        ...state,
        searchCriteria: action.searchCriteria
    }
    case UPDATE_FOODS_RESULTS:
        return {
            ...state,
            foods: [...state.foods, ...action.foods]
        }
    default:
      return state;
  }
};

export function useMealReducer(initialState) {
  return useReducer(reducer, initialState)
}