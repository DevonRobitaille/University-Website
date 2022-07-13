import React, { useState, useCallback } from 'react'
import { useBetween } from 'use-between';
import Dropzone from 'react-dropzone'

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
import { BodyTopicContainer, BodyTopicRowContainer, BodyTopicOuterBox } from '../../utils/styles/body-topic'
import { SubmissionEditBox, SubmissionEditTitleBox, SubmissionEditMaterialBox, SubmissionEditContentContainer,SubmissionEditContentInnerContainer, SubmissionEditInfoBox, SubmissionEditVerifiedWorkBox, SubmissionEditSubmissionOuterContainer, SubmissionEditBtnOptionContainer, SubmissionEditBtnContainer, SubmissionEditBtn } from '../../utils/styles/submission-edit'
// DropBox
import { DropBoxContainer, DropBox } from '../../utils/styles/dropzone'

// Constants
import { courseSubmissionEdit } from '../../utils/constants/submission-edit-constants'

const useCheckbox = () => {
  const [check, setCheck] = useState(false);
  const checked = useCallback(() => setCheck(c => !c), []);
  return {
    check,
    checked,
  };
};

const useSharedChecked = () => useBetween(useCheckbox);

function uploadFile(files) {
    // https://upmostly.com/tutorials/upload-a-file-from-a-react-component
}

function HandleSave(props) {
    if (props) alert("Files submitted successfully")
    else alert("Please select the required box to verify that this is your own work, except for where you have acknowledged the use of works of other people")
}

function DropZone({accept}) {
    const maxSize = 1048576;
    return (
        <div className="text-center mt-5">
        <Dropzone
        accept={accept}
        minSize={0}
        maxSize={maxSize}
        multiple
        >
          {({isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, fileRejections }) => {
              const isFileTooLarge = fileRejections .length > 0 && fileRejections [0].size > maxSize;
                return (<div {...getRootProps()}>
                    <DropBoxContainer>
                        <DropBox>
                            <input {...getInputProps()}/>
                            {!isDragActive && 'Click here or drop a file to upload!'}
                            {isDragActive && !isDragReject && "Drop it like it's hot!"}
                            {isDragReject && "File type not accepted, sorry!"}
                            {isFileTooLarge && (
                                <div className="text-danger mt-2">
                                    File is too large.
                                </div>
                              )}
                        </DropBox>
                        <ul className="list-group mt-2">
                          {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
                            <li>
                              {acceptedFile.name}
                            </li>
                          ))}
                        </ul>
                    </DropBoxContainer>
                </div>)
        }}
        </Dropzone>
      </div>
    )
}

function Body({history, body, match}) {
    const { check, checked } = useSharedChecked()
    return (
        <BodyTopicContainer>
            <BodyTopicRowContainer>
                <BodyTopicOuterBox>
                    <SubmissionEditBox>
                        <SubmissionEditTitleBox> Title </SubmissionEditTitleBox>
                        <SubmissionEditMaterialBox>
                            <ul>
                                <li>Material 1</li>
                                <li>Material 2</li>
                                <li>Material 3</li>
                            </ul>
                        </SubmissionEditMaterialBox>

                        <SubmissionEditContentContainer>
                                <SubmissionEditContentInnerContainer>
                                    <SubmissionEditInfoBox>File submissions</SubmissionEditInfoBox>
                                </SubmissionEditContentInnerContainer>
                                <SubmissionEditInfoBox/>
                                <SubmissionEditSubmissionOuterContainer>

                                    <SubmissionEditVerifiedWorkBox>
                                            <input type="checkbox" onChange={checked}/>
                                            <li>This assignment is my own work, except for where I have acknowledged the use of works of other people</li>
                                    </SubmissionEditVerifiedWorkBox>

                                        <DropZone accept="image/*,audio/*,video/*,.pdf"/>

                                    <SubmissionEditBtnOptionContainer>
                                        <SubmissionEditBtnContainer>
                                            <SubmissionEditBtn onClick={() => HandleSave(check)}>
                                                Submit
                                            </SubmissionEditBtn>
                                        </SubmissionEditBtnContainer>
                                    </SubmissionEditBtnOptionContainer>

                                </SubmissionEditSubmissionOuterContainer>
                        </SubmissionEditContentContainer>
                    </SubmissionEditBox>
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

export function CourseStudentEditSubmissionPage({ history, match }) {
    const header = courseSubmissionEdit.header;
    const body = courseSubmissionEdit.body;
    const sidebar = courseSubmissionEdit.sidebar;

    // const {setContent} = React.useContext(SidebarContentContext)

    // setContent(sidebar)

     return (
         <Page history={history} body={body} header={header} match={match} />
    )
}

export default CourseStudentEditSubmissionPage
