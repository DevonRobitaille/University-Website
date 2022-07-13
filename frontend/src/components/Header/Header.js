import React, { useState, useEffect } from 'react'
import "../../utils/styles/header.css"

export class Header extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {

        const header = this.props.header
        const history = this.props.history

        return (
            <div class="page-header">
                <div class="card">
                    <div class="card-body">
                        <div class="header">
                            <div class="title-long">
                                <div class="page-content-header">
                                    <h3>{header.courseTitle}</h3>
                                </div>
                                <div class="filler"/>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="navigation">
                                <ul>
                                    {header.links.map((link, index) => (
                                        <li key={"div"+index}>
                                            <li key={index} onClick={() => { history.push(link.path)}}>
                                                {link.name}
                                            </li>
                                            <li key={"/"+index}>/</li>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
