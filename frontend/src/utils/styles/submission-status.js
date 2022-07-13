import styled, { css } from "styled-components";

export const SubmissionStatusBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    & {
        border-bottom: 1px solid ${({ theme }) => theme.base.sidebar};
    }
    &:last-child {
        border: none;
    }
`;

export const SubmissionStatusTitleBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding: 10px;
    font-size: 24px;
    font-weight: bold;
`;

export const SubmissionStatusContentBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding: 10px;
`;


// Submission Box content container manager
export const SubmissionStatusContentRowBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    font-size:14px;
    display: flex;
    border-top: 2px solid ${({ theme }) => theme.base.sidebar};
    &:nth-child(odd) {
        background-color: ${({ theme }) => theme.base.background};
    }

`;

export const SubmissionStatusContentRowSubTitleBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding: 5px;
    padding-left: 10px;
    font-size:15px;
    width: 160px;
    font-weight: bold;
`;

export const SubmissionStatusContentRowResultBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    background: ${
        props =>
        // success
        (props.success) ? ({ theme }) => theme.submission_background.success :
        // warning
        (props.warning) ? ({ theme }) => theme.submission_background.warning :
        // default
         "auto"};
    padding: 5px;
    padding-left: 20px;
    font-size:15px;
    display: flex;
    width:100%
`;

// Comments Box
export const SubmissionStatusContentRowCommentsContainer = styled.div`
    display: flex;
     flex-direction: column;
`;

export const SubmissionStatusContentRowCommentsBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    font-size:15px;
    padding: 5px;
    width:100%;
`;

export const SubmissionStatusContentRowFilesBox = styled.div`
    color: ${({ theme }) => theme.url.color};
    font-size:15px;
    padding: 5px;
    width:100%;
    &:hover {
        cursor:pointer;
        text-decoration: underline;
    }
`;

export const SubmissionStatusBtnOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

// Btns
export const SubmissionStatusBtnContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SubmissionStatusBtn = styled.button`
     text-align: center;
     font-size: 14px;
     padding: 5px;
     background-color: ${({ theme }) => theme.base.background};
     color: ${({ theme }) => theme.text.other};
     &:hover {
         background-color: ${({ theme }) => theme.base.sidebar};
     }
`;

export const SubmissionStatusInfoBox = styled.div`
     text-align: center;
     font-size: 14px;
     padding: 5px;
     color: ${({ theme }) => theme.text.other};
     background-color: white;
`;
