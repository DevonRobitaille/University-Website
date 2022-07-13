import styled, { css } from "styled-components";

export const SubmissionEditBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    width: 100%;
    & {
        border-bottom: 1px solid ${({ theme }) => theme.base.sidebar};
    }
    &:last-child {
        border: none;
    }
`;

export const SubmissionEditTitleBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding: 10px;
    font-size: 24px;
    font-weight: bold;
`;

export const SubmissionEditMaterialBox = styled.div`
    padding: 10px;
    ul {
        list-style: none;
        padding: 5px;
    }
    ul li {
        padding-left: 10px;
        color: ${({ theme }) => theme.url.color};
        &:hover {
            cursor:pointer;
            text-decoration: underline;
        }
    }
`;

export const SubmissionEditContentContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SubmissionEditContentInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SubmissionEditSubmissionOuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    min-width: 300px;
`;

export const SubmissionEditVerifiedWorkBox = styled.div`
    padding: 5px;
    font-size: 13px;
    display: flex;
`;

export const SubmissionEditInfoBox = styled.div`
    padding: 5px;
    font-size: 14px;
    flex: 1;
`;

// Btns
export const SubmissionEditBtnOptionContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SubmissionEditBtnContainer = styled.div`
    display: flex;
    padding-top:10px;
    padding-right: 5px;
`;

export const SubmissionEditBtn = styled.button`
     text-align: center;
     font-size: 14px;
     padding: 5px;
     background-color: ${({ theme }) => theme.base.background};
     color: ${({ theme }) => theme.text.other};
     &:hover {
         background-color: ${({ theme }) => theme.base.sidebar};
     }
`;
