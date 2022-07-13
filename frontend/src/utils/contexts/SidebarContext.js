import React from 'react'

const SidebarContext = React.createContext( {
    status: undefined,
    setStatus: () => {},
} )

export const SidebarContextProvider = SidebarContext.Provider

export default SidebarContext
