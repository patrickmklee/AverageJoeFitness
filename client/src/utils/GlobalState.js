import React, { createContext, useContext } from "react";
import { useScheduleReducer } from './reducers'

const ScheduleContext = createContext();
const { Provider } = ScheduleContext;

const ScheduleProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useScheduleReducer({
    // products: [],
    foods: [],
    meal: [],
    mealOpen: false,
    searchCriteria: '',
    timeline: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useScheduleContext = () => {
  return useContext(ScheduleContext);
};

export { ScheduleProvider, useScheduleContext };
