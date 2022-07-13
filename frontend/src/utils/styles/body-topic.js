import styled, { css } from "styled-components";

export const BodyTopicContainer = styled.footer`
    display: flex;
    flex-direction: row;
`;

export const BodyTopicRowContainer = styled.div`
    width: 100%;
    padding:10px;
    display: flex;
`;

export const BodyTopicOuterBox = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.base.content} ;
    border:  1px solid ${({ theme }) => theme.base.sidebar};
    box-shadow: 0px 0px 15px 2px rgba(0 ,0, 0, 0.25);
    padding:15px;
    display: flex;
    flex-direction: column;
`;

export const BodyTopicBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    & {
        border-bottom: 1px solid ${({ theme }) => theme.base.sidebar};
    }
    &:last-child {
        border: none;
    }
`;

export const BodyTopicTitleBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
`;

export const BodyTopicContentBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding: 10px;
`;

export const BodyTopicContentActionBox = styled.div`
    color: ${({ theme }) => theme.url.color};
    padding: 5px;
    font-size:15px;
    &:hover {
        cursor:pointer;
        text-decoration: underline;
    }
`;

export const BodyTopicContentDescriptionBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding: 5px;
    padding-left: 20px;
    font-size:14px;
`;



// Activities Card

export const BodyActitivitesRowContainer = styled.div`
    width: 475px;
    padding:10px;
    display: flex;
    flex-direction: column;
`;

export const BodyActitivitesOuterBox = styled.div`
    width: calc(100%-20px);
    display: flex;
    background-color: ${({ theme }) => theme.base.content} ;
    border:  1px solid ${({ theme }) => theme.base.sidebar};
    box-shadow: 0px 0px 15px 2px rgba(0 ,0, 0, 0.25);
    padding:15px;
    display: flex;
    flex-direction: column;
`;

export const BodyActitivitesUrlList = styled.div`
    box-sizing: border-box;
    color: ${({ theme }) => theme.url.color};
    font-size: 14px;
    ul {
        list-style: none;
    }
    ul li {
        padding-bottom: 10px;
        padding-left: 20px;
        &:hover {
            cursor:pointer;
            text-decoration: underline;
        }
    }
`;
