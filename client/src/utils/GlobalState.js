import React, { createContext, useContext } from "react";
import { useMealReducer } from './reducers'

const MealContext = createContext();
const { Provider } = MealContext;

const MealProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useMealReducer({
    // products: [],
    foods: [],
    meal: [],
    mealOpen: false,
    searchCriteria: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useMealContext = () => {
  return useContext(MealContext);
};

export { MealProvider, useMealContext };
