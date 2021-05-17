import { useReducer } from "react";
import dayjs from 'dayjs'
import {
    UPDATE_FOODS_RESULTS,
    UPDATE_SEARCH_CRITERIA,
    ADD_TO_MEAL,
    ADD_MULTIPLE_TO_MEAL,
    REMOVE_FROM_MEAL,
    UPDATE_MEAL_QUANTITY,
    CLEAR_MEAL,
    UPDATE_TIMELINE,
    TOGGLE_MEAL
  } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    
    case ADD_TO_MEAL:
      return {
        ...state,
        mealOpen: true,
        meal: [...state.meal,  action.food ]
      };
    case CLEAR_MEAL:
        return {
          ...state,
          mealOpen: false,
          meal: []
        };
    case UPDATE_SEARCH_CRITERIA:
    return {
        ...state,
        searchCriteria: action.searchCriteria
    }
    case UPDATE_TIMELINE:
        return {
            ...state,
            timeline: [...state.timeline, action.timeline]
        };
    case UPDATE_FOODS_RESULTS:
        return {
            ...state,
            searchCriteria: action.searchCriteria,
            foods: [...state.foods, ...action.foods]
        }
    default:
      return state;
  }
};

export function useScheduleReducer(initialState) {
  return useReducer(reducer, initialState)
}