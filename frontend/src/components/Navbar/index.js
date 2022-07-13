import React, {Component} from 'react'
import '../../utils/styles/navbar.css'

// Contexts
import GlobalStateContext from "../../utils/contexts/GlobalStateContext";

export function Navbar({history}) {
    const {globalState, setGlobalState} = React.useContext(GlobalStateContext)


    function UpdateSidebarState() {
        const newGlobalState = {}
        newGlobalState.sidebar_visible = !globalState.sidebar_visible
        setGlobalState(newGlobalState)
    }

    return (
        <div class="navbar-container-fluid">
            <div class="navbar-region">
                <section>
                    <i class="fas fa-bars" onClick={ UpdateSidebarState }></i>
                </section>
                <ul>
                    <li onClick={() => {
                        history.push('/@me/');
                    }}>Dashboard</li>
                    <li onClick={() => {
                        history.push('/@me/profile');
                    }}>Profile</li>
                </ul>
                <section>
                    <i class="fab fa-discord" onClick={() => {
                        history.push('/discord/');
                    }}></i>
                </section>
            </div>
        </div>
    )
}

export default Navbar