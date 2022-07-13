import styled, { css } from "styled-components";

export const LoginFormContainer = styled.footer`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const LoginFormRowContainer = styled.div`
    padding: 80px;
    display: flex;
    width: 100%;
`;

export const LoginFormOuterBox = styled.div`
    width: 400px;
    background-color: ${({ theme }) => theme.base.content} ;
    border:  1px solid ${({ theme }) => theme.base.sidebar};
    box-shadow: 0px 0px 20px 2px rgba(0 ,0, 0, 0.55);
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

export const LoginFormBox = styled.div`
    color: ${({ theme }) => theme.text.other};
`;

export const LoginFormContentBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    width: 100%;
    input {
        width: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 20px;
    }
    button {
        width: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 20px;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.base.background};
        &:hover {
            background-color: ${({ theme }) => theme.base.sidebar};
        }
    }
`;

export const LoginFormContentTitleBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    font-size:15px;
    font-weight: bold;
`;
