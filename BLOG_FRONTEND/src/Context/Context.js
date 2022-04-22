import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  theme: JSON.parse(localStorage.getItem("isDark")) || false,
};
const Context = createContext(INITIAL_STATE);
const Reducer = (state, action) => {
  switch (action.type) {
    case "USER_FETCHED":
      return {
        user: action.payload,
        theme: state.theme,
      };
    case "LOGOUT":
      return {
        user: null,
        theme: state.theme,
      };
    case "LIGHTMODE":
      return {
        user: state.user,
        theme: false,
      };
    case "DARKMODE":
      return {
        user: state.user,
        theme: true,
      };

    default:
      return state;
  }
};
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isDark", JSON.stringify(state.theme));
  }, [state.user, state.theme]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        theme: state.theme,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
