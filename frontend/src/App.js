import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

// Pages
import { CourseListPage, CoursePage, CourseStudentSubmissionPage, CourseStudentEditSubmissionPage, CourseStudentGradePage, LoginPage } from './pages'

// Components
import { Navbar } from './components'

// Contexts
import { SidebarContextProvider } from "./utils/contexts/SidebarContext";
import { GlobalStateContextProvider } from "./utils/contexts/GlobalStateContext";


function App(props) {
    // Status of sidebar
    const [status, setStatus] = React.useState(true)
    // Status of global
    const [globalState, setGlobalState] = React.useState({});

    const history = useHistory();

    return (
        <Providers status={status} setStatus={setStatus} globalState={globalState} setGlobalState={setGlobalState}>
            <Navbar history={history}/>
            <Routes history={history}/>
        </Providers>
    )
}

function Providers({ children, status, setStatus, globalState, setGlobalState }) {
    return (
        <GlobalStateContextProvider value={{  globalState, setGlobalState }}>
            <SidebarContextProvider value={{ status, setStatus }}>            
                {children}            
            </SidebarContextProvider>
        </GlobalStateContextProvider>
    )
}

function Routes({history}) {
    return (
      <Switch>
          <Redirect path='/' exact={ true } to="/login/" />
          <Route path='/login' exact={ true } component={ LoginPage } />
          <Route path='/@me/' exact={ true } component={ CourseListPage } />
          <Route path='/@me/course/:courseId/' exact={ true } component={ CoursePage } />
          <Route path='/@me/course/:courseId/assign/:assignId' exact={ true } component={ CourseStudentSubmissionPage } />
          <Route path='/@me/course/:courseId/assign/:assignId/edit' exact={ true } component={ CourseStudentEditSubmissionPage } />
      </Switch>
    )
}

export default App;


