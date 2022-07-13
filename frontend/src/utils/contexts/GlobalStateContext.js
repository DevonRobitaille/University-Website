import React, { createContext, useState } from "react";

export let GlobalStateContext = createContext({
  globalState: undefined,
  setGlobalState: () => {}
})

export const GlobalStateContextProvider = GlobalStateContext.Provider

export default GlobalStateContext