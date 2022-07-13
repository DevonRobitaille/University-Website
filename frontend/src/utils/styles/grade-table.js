import React from "react";
import styled, {css} from "styled-components";

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  caption-side: bottom;
  width: 100%;
  font-size: 18px;
  border-top: 1.5px solid ${({ theme }) => theme.base.navbar};
  td,
  th {
    border: none;
  }
  tbody tr {
     border-bottom: 1px solid ${({ theme }) => theme.base.navbar};
    :nth-of-type(odd) {
      background-color: ${({ theme }) => theme.base.background};
      td {
          padding-top: 5px;
          padding-bottom: 5px;
          font-weight: normal;
          :first-child {
              color: ${({ theme }) => theme.url.color};
              &:hover {
                  cursor: pointer;
                  text-decoration: underline;
              }
          }
      }
  }
    :nth-of-type(even) {
      background-color: white;
      td {
          padding-top: 5px;
          padding-bottom: 5px;
          font-weight: normal;
          :first-child {
              color: ${({ theme }) => theme.url.color};
              &:hover {
                  cursor: pointer;
                  text-decoration: underline;
              }
          }
      }
    }
    :last-child {
      background-color: ${({ theme }) => theme.base.background};
      td {
          padding-top: 5px;
          padding-bottom: 5px;
          font-weight: bold;
          :first-child {
              color: ${({ theme }) => theme.text.other};
              &:hover {
                  cursor: auto;
                  text-decoration: none;
              }
          }
          }
      }
    }
}

  thead > tr {
      border-bottom: 1px solid ${({ theme }) => theme.base.navbar};
  }
`;

const TableCourseTitleRow = styled.tr`
    background-color: white;
    text-align: left;
    border-top: 1px solid ${({ theme }) => theme.base.sidebar};
    border-bottom: 1px solid ${({ theme }) => theme.base.sidebar};
`;

const TableCourseTitleHeader = styled.th`
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
`;

const TableCourseBodyDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const TableCourseGradeTableHeader = styled.div`
    font-size: 24px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.base.sidebar};
    border-top: 1.5px solid ${({ theme }) => theme.base.navbar};
    padding-left: 24px;
`;

export default ({ data }) => (
  <TableMarkup titles={data.columnTitles} data={data} />
);

const TableMarkup = ({ titles, data }) => (
        <TableCourseBodyDiv>
        <TableCourseGradeTableHeader>
            Course 1

                <StyledTable>
                    <thead>
                      <TableCourseTitleRow>
                        {titles.map((title, index) => (
                          <TableCourseTitleHeader key={index}>{title}</TableCourseTitleHeader>
                        ))}
                      </TableCourseTitleRow>
                    </thead>

                    <tbody>
                      {data.report.map((item, index) => (
                        <tr key={index}>
                                <td key={0}>{item.gradeItem}</td>
                                <td key={1}>{item.grade}</td>
                                <td key={2}>{item.range}</td>
                        </tr>
                        ))}
                      {data.total.map((item, index) => (
                        <tr key={index}>
                                <td key={0}>{item.gradeTotal}</td>
                                <td key={1}>{item.grade}</td>
                                <td key={2}>{item.range}</td>
                        </tr>
                      ))}
                    </tbody>

                </StyledTable>


                </TableCourseGradeTableHeader>
        </TableCourseBodyDiv>
);

export const TableSpan = styled.span`
    font-weight: bold;
`;

/*

        <TableCourseNameRow>
            <td rowspan={data.report.length+2} width="24px"/>
            <TableCourseNameHeader>Course 1</TableCourseNameHeader>
        </TableCourseNameRow>


      {data.report.map((item, index) => (
        <tr key={index}>
          {titles.map((title, index) => (
            <td key={index}>{item[title]}</td>
          ))}
        </tr>
      ))}
      {data.total.map((item, index) => (
        <tr key={index+data.report.length}>
          {titles.map((title, index) => (
            <td key={index+data.report.length}>
                <TableSpan>{item[title]}</TableSpan>
            </td>
          ))}
        </tr>
      ))}
*/
