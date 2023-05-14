
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

const TableRow = styled.div`
    width: 900px;
    display: flex;
    justify-content: center;
    margin: 10px 0;
`;

const CaseInput = styled.input`
    width: 100px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    margin: 0 10px;
`;

const ArgsInput = styled.input`
    width: 150px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    margin: 0 10px;
`;

const ResultInput = styled.input`
    width: 50px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    margin: 0 10px;
`;

const ColumnName = styled.p`
    font-size: 16px;
`;

const CaseControlBtn = styled.button`
    padding: 0.1em 0.25em;
    width: 3.75em;
    height: 4em;
    background-color: #212121;
    border: 0.08em solid #fff;
    border-radius: 0.3em;
    font-size: 12px;
`;

const CaseControlBtnSpan = styled.span`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0.4em;
    width: 2em;
    height: 2em;
    background-color: #212121;
    border-radius: 0.2em;
    font-size: 1.5em;
    color: #fff;
    border: 0.08em solid #fff;
    box-shadow: 0 0.4em 0.1em 0.019em #fff;
    cursor: pointer;

    :active {
        transition: all 0.1s;
        transform: translate(0, 0.4em);
        box-shadow: 0 0 0 0 #fff;
    }

    :not(focus) {
        transition: all 0.6s;
    }
`;

const FunctionTest = ({milestoneIdx}) => {

    const milestoneContext = useContext(MilestoneContext);
    const {
        milestones,
        setMilestones,
    } = milestoneContext;

    const testCases = milestones[milestoneIdx].testCases;

    const [ rows, setRows ] = useState([]);

    function handleAddCase(e) {
        e.preventDefault();
        const newRow = { id: rows.length, case: "", inputs: ["", ""], result: "" };
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
        const inputNum = e.target.name;
        const classNames = e.target.className.split(' ');
        const value = e.target.value;
        const targetIdx = classNames[classNames.length - 1];
        rows[targetIdx].inputs[inputNum] = value;
        setRows([...rows]);

        testCases[targetIdx].inputs[inputNum] = value;
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
        milestones[milestoneIdx].functionName = e.target.value;

        // generate function template
        const newFunctionTemplate = `
        function ${e.target.value}(arg1, arg2) {
            // write your code here
        }
        
        const args = process.argv.slice(2);
        
        if (args[0] === '${e.target.value}') {
            const arg1 = JSON.parse(process.env.INPUT1);
            const arg2 = JSON.parse(process.env.INPUT2);
            console.log(${e.target.value}(arg1, arg2));
        }
        `
        milestones[milestoneIdx].functionTemplate = newFunctionTemplate;
        setMilestones(milestones.slice());
    }

    return (
        <Wrapper>
            <Title>Function Name</Title>
            <FunctionName onChange={handleFuncitonName}></FunctionName>
            {
                rows.map((row, idx) => {
                    return (
                        <TableRow key={idx}>
                            <div>
                                <ColumnName>Case</ColumnName>
                                <CaseInput
                                    className={`${idx}`}
                                    onChange={handleCaseChange}
                                    required
                                ></CaseInput>
                            </div>
                            <div>
                                <ColumnName>Input 1</ColumnName>
                                <ArgsInput
                                    name="0"
                                    className={`${idx}`}
                                    onChange={handleInputsChange}
                                ></ArgsInput>
                            </div>
                            <div>
                                <ColumnName>Input 2</ColumnName>
                                <ArgsInput
                                    name="1"
                                    className={`${idx}`}
                                    onChange={handleInputsChange}
                                ></ArgsInput>
                            </div>
                            <div>
                                <ColumnName>Result</ColumnName>
                                <ResultInput
                                    className={`${idx}`}
                                    onChange={handleResultChange}
                                    required
                                ></ResultInput>
                            </div>
                        </TableRow>
                    )
                })
            }
            <div style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px"
            }}>
                <CaseControlBtn>
                    <CaseControlBtnSpan onClick={handleRemoveCase}>
                        -
                    </CaseControlBtnSpan>
                </CaseControlBtn>
                <CaseControlBtn>
                    <CaseControlBtnSpan onClick={handleAddCase}>
                        +
                    </CaseControlBtnSpan>
                </CaseControlBtn>
            </div>
        </Wrapper>
    )
}

export default FunctionTest;