
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

const Title = styled.p`
    margin: 20px 0 10px 0;
    font-size: 30px;
`;

const FunctionName = styled.input`
    height: 30px;
    font-size: 22px;
    text-align: center;
    padding: 20px 0;
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
    width: 100px;
    height: 30px;
    font-size: 18px;
    text-align: center;
    margin: 0 10px;
`;

const ColumnName = styled.p`
    font-size: 16px;
`;

const RowNumber = styled.p`
    align-self: flex-end;
    margin: 0;
`;

// const rowExample = {
//     id: Number,
//     caseName: String,
//     params: Array,
//     result: String
// }

const FunctionTest = ({milestoneIdx}) => {

    const milestoneContext = useContext(MilestoneContext);
    const {
        milestones,
        setMilestones,
        setFunctionName
    } = milestoneContext;

    const testCases = milestones[milestoneIdx].testCases;

    const [ rows, setRows ] = useState([]);

    function handleAddCase(e) {
        e.preventDefault();
        const newRow = { id: rows.length, case: "", inputs: "", result: "" };
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
        const value = e.target.value;
        rows[targetIdx].case = value;
        setRows([...rows]);

        testCases[targetIdx].case = value;
        setMilestones(milestones.slice());
    }

    function handleInputsChange(e) {
        e.preventDefault();
        const classNames = e.target.className.split(' ');
        const value = e.target.value;
        const targetIdx = classNames[classNames.length - 1];
        rows[targetIdx].inputs = value;
        setRows([...rows]);

        testCases[targetIdx].inputs = value;
        setMilestones(milestones.slice());
    }

    function handleResultChange(e) {
        e.preventDefault();
        const classNames = e.target.className.split(' ');
        const value = e.target.value;
        const targetIdx = classNames[classNames.length - 1];
        rows[targetIdx].result = value;
        setRows([...rows]);

        testCases[targetIdx].result = value;
        setMilestones(milestones.slice());
    }

    function handleFuncitonName(e) {
        e.preventDefault();
        setFunctionName(e.target.value);
    }

    return (
        <Wrapper>
            <Title>Function Name</Title>
            <FunctionName onChange={handleFuncitonName}></FunctionName>
            {
                rows.map((row, idx) => {
                    return (
                        <TableRow key={idx}>
                            <RowNumber>{idx}</RowNumber>
                            <div>
                                <ColumnName>Case</ColumnName>
                                <EachInput
                                    className={`${idx}`}
                                    onChange={handleCaseChange}
                                ></EachInput>
                            </div>
                            <div>
                                <ColumnName>Inputs</ColumnName>
                                <EachInput
                                    className={`${idx}`}
                                    onChange={handleInputsChange}
                                ></EachInput>
                            </div>
                            <div>
                                <ColumnName>Result</ColumnName>
                                <EachInput
                                    className={`${idx}`}
                                    onChange={handleResultChange}
                                ></EachInput>
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

export default FunctionTest;