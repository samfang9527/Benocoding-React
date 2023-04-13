
import styled from "styled-components";

import { useState, useContext } from "react";
import { MilestoneContext } from "..";

const Wrapper = styled.div`
    width: 100%;
    margin: 30px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CaseControlBlock = styled.div`

`;

const CaseControlBtn = styled.button`
    width: 150px;
    height: 30px;
    border: none;
    margin: 10px;
    cursor: pointer;
    background-color: orange;
    color: white;
    font-size: 18px;

    :hover {
        background-color: darkorange;
    }
`;

const TableRow = styled.div`
    width: 900px;
    display: flex;
    justify-content: center;
    margin: 10px 0;
`;

const EachInput = styled.input`
    width: 200px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    margin: 0 10px;
`;

const CustomTextArea = styled.textarea`
    width: 200px;
    height: 200px;
    font-size: 18px;
    margin: 0 10px;
`;

const ColumnName = styled.p`
    font-size: 16px;
`;

const ApiTest = ({milestoneIdx}) => {

    const milestoneContext = useContext(MilestoneContext);
    const { milestones, setMilestones } = milestoneContext;
    const testCases = milestones[milestoneIdx].testCases;

    const [ rows, setRows ] = useState([]);

    function handleAddCase(e) {
        e.preventDefault();
        const newRow = { id: rows.length, case: "", method: "", statusCode: "", result: "" };
        setRows([...rows, newRow]);
        testCases.push(newRow);
        setMilestones(milestones.slice());
    }

    function handleRemoveCase(e) {
        e.preventDefault();
        if (rows.length > 0) {
            const newRows = rows.slice(0, rows.length - 1);
            setRows(newRows);

            testCases.pop();
            setMilestones(milestones.slice());
        }
    }

    function handleCaseChange(e) {
        e.preventDefault();
        const classNames = e.target.className.split(' ');
        const targetIdx = classNames[classNames.length - 1];
        const value = JSON.stringify(e.target.value);
        rows[targetIdx].case = value;
        setRows([...rows]);

        testCases[targetIdx].case = value;
        setMilestones(milestones.slice());
    }

    function handleMethodChange(e) {
        e.preventDefault();
        const classNames = e.target.className.split(' ');
        const value = JSON.stringify(e.target.value);
        const targetIdx = classNames[classNames.length - 1];
        rows[targetIdx].method = value;
        setRows([...rows]);

        testCases[targetIdx].method = value;
        setMilestones(milestones.slice());
    }

    function handleStatusCodeChange(e) {
        e.preventDefault();
        const classNames = e.target.className.split(' ');
        const value = JSON.stringify(e.target.value);
        const targetIdx = classNames[classNames.length - 1];
        rows[targetIdx].statusCode = value;
        setRows([...rows]);

        testCases[targetIdx].statusCode = value;
        setMilestones(milestones.slice());
    }

    function handleResultChange(e) {
        e.preventDefault();
        const classNames = e.target.className.split(' ');
        const value = JSON.stringify(e.target.value);
        const targetIdx = classNames[classNames.length - 1];
        rows[targetIdx].result = value;
        setRows([...rows]);

        testCases[targetIdx].result = value;
        setMilestones(milestones.slice());
    }

    return (
        <Wrapper>
            {
                rows.map((row, idx) => {
                    return (
                        <TableRow key={idx}>
                            <div>
                                <ColumnName>Case</ColumnName>
                                <EachInput
                                    className={`${idx}`}
                                    onChange={handleCaseChange}
                                ></EachInput>
                            </div>
                            <div>
                                <ColumnName>Method</ColumnName>
                                <EachInput
                                    className={`${idx}`}
                                    onChange={handleMethodChange}
                                ></EachInput>
                            </div>
                            <div>
                                <ColumnName>Status Code</ColumnName>
                                <EachInput
                                    className={`${idx}`}
                                    onChange={handleStatusCodeChange}
                                ></EachInput>
                            </div>
                            <div>
                                <ColumnName>Result</ColumnName>
                                <CustomTextArea
                                    className={`${idx}`}
                                    onChange={handleResultChange}
                                ></CustomTextArea>
                            </div>
                        </TableRow>
                    )
                })
            }
            <CaseControlBlock>
                <CaseControlBtn onClick={handleAddCase}>Add case</CaseControlBtn>
                <CaseControlBtn onClick={handleRemoveCase}>Remove case</CaseControlBtn>
            </CaseControlBlock>
        </Wrapper>
    )
}

export default ApiTest;
