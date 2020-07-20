import React, { createContext } from "react";

const StoreContext = createContext(null);

const Store = (props) => {
  return (
    <StoreContext.Provider value={props.value}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
export { Store };
