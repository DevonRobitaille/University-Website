import React from 'react'
import GlobalStateContext from "../../utils/contexts/GlobalStateContext";
import '../../utils/styles/sidebar.css'

function Header({history, title, id, icon, path}) {
    if (title){
    return (
        <div class="sidebar-header" onClick={() => {
            history.push(path);
        }}>
            <i class={icon}></i>
            <ul>
                <li>{title}</li>
            </ul>
        </div>
    )} return <div/>
}

function URLContent({history, urls}){
    if (urls){
    return (
        <div>
            {urls.map((item) => (
                <div class="sidebar-content" onClick={() => {
                    history.push(item.path);
                }}>
                    <i class={item.icon}></i>
                    <ul>
                        <li>{item.title}</li>
                    </ul>
                </div>
            ))}
        </div>
    )} return <div/>
}

function ScrollToContent({history, scrollTos}){
    if (scrollTos){
    return (
        <div>
        {scrollTos.map((item) => (
            <div class="sidebar-content" onClick={() => {
                history.push(item.path+item.id);
            }}>
                <i class={item.icon}></i>
                <ul>
                    <li>{item.title}</li>
                </ul>
            </div>
        ))}
        </div>
    )} return <div/>
}


function Content({history, urls, scrollTos}) {
    return (
        <div>
            <URLContent history={history} urls={urls} />
            <ScrollToContent history={history} scrollTos={scrollTos} />
        </div>
    )
}

export function Sidebar({ history, content }) {
    const {globalState, setGlobalState} = React.useContext(GlobalStateContext)

    if (!content) {
        setGlobalState({sidebar_visible: true})
        return <div/>
    }

    if (content.length === 0) {
        setGlobalState({sidebar_visible: true})
        return <div/>
    }
    
    if (!globalState.sidebar_visible){
        return (
            <aside class="sidebar-container">
                <Header history={history} title={content.sidebarTitle} id={content.siderbarTitleId} icon={content.icon} path={content.path}/>
                <Content history={history} urls={content.url} scrollTos={content.scrollTo}/>
            </aside>
        )
    } return <div></div>

}

export default Sidebar
