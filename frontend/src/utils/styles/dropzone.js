import styled, { css } from "styled-components";

export const DropBoxContainer = styled.footer`
    display: flex;
    flex-direction: column;
    border: 2px dashed #FF0000;
    align-items:center;
    border: 2px solid ${({ theme }) => theme.base.sidebar};
    border-radius: 10px;
    min-height: 100px;
    ul {
        list-style: none;
        padding: 15px;
        width: 100%;
        text-align: center;
    }
    ul li {
        background-color: ${({ theme }) => theme.status.success};
        font-weight: bold;
    }
`;

export const DropBox = styled.div`
    color: ${({ theme }) => theme.text.other};
    padding: 10px;
    font-size: 24px;
    font-weight: bold;
`;
