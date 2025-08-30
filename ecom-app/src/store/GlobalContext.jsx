import CONSTANTS from "@ecom/ui/constants";
import React, { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  roles: [],
  entities: [],
  user: null,
};

// Reducer function
function globalReducer(state, action) {
  switch (action.type) {
    case CONSTANTS.GLOBAL_STORE.SET_ROLES:
      return { ...state, roles: action.payload };
    case CONSTANTS.GLOBAL_STORE.SET_ENTITIES:
      return { ...state, entities: action.payload };
    case CONSTANTS.GLOBAL_STORE.SET_LOGGEDIN_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// Create context
const GlobalContext = createContext();

// Provider component
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook for easier usage
export function useGlobalContext() {
  return useContext(GlobalContext);
}
