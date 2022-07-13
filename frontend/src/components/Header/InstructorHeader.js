import React, { useState, useEffect } from 'react'
import "../../utils/styles/header.css"

// Contexts
import GlobalStateContext from "../../utils/contexts/GlobalStateContext";

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
} 

export class InstructorHeader extends React.Component {
    constructor(props) {
        super(props)
        
    }

    state = {
        editing: false
    }

    enableEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
        document.getElementById("myDropdown").classList.toggle("show");
    }

    redirectCourseSettings = () => {
        console.log("Redirected to course settings page")
        return undefined
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
                                <div class="page-content-header dropdown">
                                    <div class="dropdown">
                                        <button onClick={showDropdown} class="dropbtn">
                                            <i class="fas fa-cog"></i>
                                            <i class="fa fa-caret-down"></i>
                                        </button>
                                        <div id="myDropdown" class="dropdown-content">
                                            <a onClick={this.redirectCourseSettings}>
                                                <i class="fas fa-cog"/>
                                                Edit settings
                                            </a>                                            
                                            <a onClick={this.enableEditing}>
                                                <i class="fas fa-pencil-alt"/>
                                                {(!this.state.editing) ? "Turn editing on" : "Turn editing off"}
                                            </a>
                                        </div>
                                    </div> 
                                </div>
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

export default InstructorHeader
