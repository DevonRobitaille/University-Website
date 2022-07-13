import React, { useState, useCallback } from 'react'

// Contexts
import GlobalStateContext from "../../utils/contexts/GlobalStateContext";

// Base Page
import '../../utils/styles/base-page.css'
// Header
import { Header } from '../../components/'
// Footer
import { Footer } from '../../components/'
// Filler
import { FlexBoxFiller } from '../../utils/styles/flexbox-filler'
// Body
import { BodyTopicContainer, BodyTopicRowContainer, BodyTopicOuterBox, BodyTopicBox, BodyTopicTitleBox, BodyTopicContentBox } from '../../utils/styles/body-topic'
// Table Report
import Table from '../../utils/styles/grade-table'

// Constants
import { course } from '../../utils/constants/course-grade-constants'

function Body({history, body, match}) {
    return (
        <BodyTopicContainer>
            <BodyTopicRowContainer>
                <BodyTopicOuterBox>
                    <BodyTopicBox>

                        <BodyTopicTitleBox>User report - User Name</BodyTopicTitleBox>

                        <BodyTopicContentBox>
                            <Table data={body} />
                        </BodyTopicContentBox>

                    </BodyTopicBox>
                </BodyTopicOuterBox>
            </BodyTopicRowContainer>
        </BodyTopicContainer>
    )
}

function Page({history, body, header, match}) {
    const { globalState } = React.useContext(GlobalStateContext)

    return (
        <div>
            <input type="radio" class="input" checked={!globalState.sidebar_visible} />
            <div class="base-page-container">
                <Header history={history} header={header} />
                <Body history={history} body={body} match={match} />
                <FlexBoxFiller />
                <Footer history={history} />
            </div>
        </div>
    )
}

export function CourseStudentGradePage({ history, match }) {
    const header = course.header;
    const body = course.body;
    const sidebar = course.sidebar;

    // const {setContent} = React.useContext(SidebarContentContext)

    // setContent(sidebar)

     return (
         <Page history={history} body={body} header={header} match={match} />
    )
}

export default CourseStudentGradePage
