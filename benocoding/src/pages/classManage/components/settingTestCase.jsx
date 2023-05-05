
import styled from "styled-components";
import { useContext, useState } from "react";
import { MilestoneContext } from "./settings";

const Title = styled.p`
    font-size: 28px;
`;

const SingleInput = styled.input`
    height: 50px;
    width: 90%;
    padding: 5px 10px;
    font-size: 20px;
`;

const EachTestCaseBlock = styled.div`
    display: flex;
    margin: 10px;
`;

const EachTestCaseInputBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;
`;

const TestCaseInput = styled.input`
    width: 100px;
    height: 30px;
    font-size: 16px;
    margin: 5px 0;
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

const TextArea = styled.textarea`
    width: 90%;
    height: 100px;
    overflow: scroll;
    font-size: 18px;
`;

const SettingTestCase = ({ testType, milestoneIdx, milestoneData }) => {

    const milestoneContext = useContext(MilestoneContext);
    const { changedMilestones, setChangedMilestones } = milestoneContext;
    const { functionName, testCases } = changedMilestones[milestoneIdx];
    const { autoTest, functionTest } = milestoneData;
    
    const [ eachTestTypeData, setEachTestTypeData ] = useState({
        "function": autoTest && functionTest ? testCases : [],
        "api": autoTest && !functionTest ? testCases : []
    })

    console.log('eachTestType', eachTestTypeData);

    function handleFunctionNameChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        changedMilestones[milestoneIdx][name] = value;

        const functionTemplate = `
        function ${value}(arg1, arg2) {
            // write your code here
        }
        
        const args = process.argv.slice(2);
        
        if (args[0] === '${value}') {
            const arg1 = JSON.parse(process.env.INPUT1);
            const arg2 = JSON.parse(process.env.INPUT2);
            console.log(${value}(arg1, arg2));
        }
        `
        changedMilestones[milestoneIdx].functionTemplate = functionTemplate;
        setChangedMilestones(changedMilestones.slice());
    }

    function handleFunctionCaseChange(e, idx, name) {
        e.preventDefault();
        const value = e.target.value;
        const functionCases = eachTestTypeData["function"];
        functionCases[idx][name] = value;
        changedMilestones[milestoneIdx].testCases = functionCases;
        setChangedMilestones(changedMilestones.slice());
    }

    function handleFunctionCaseInputsChange(e, idx, name, n) {
        e.preventDefault();
        const value = e.target.value;
        const functionCases = eachTestTypeData["function"];
        functionCases[idx][name][n] = value;
        changedMilestones[milestoneIdx].testCases = functionCases;
        setChangedMilestones(changedMilestones.slice());
    }

    function handleAPICaseChange(e, idx, name) {
        e.preventDefault();
        const value = e.target.value;
        const functionCases = eachTestTypeData["api"];
        functionCases[idx][name] = value;
        changedMilestones[milestoneIdx].testCases = functionCases;
        setChangedMilestones(changedMilestones.slice());
    }

    function renderFunctionTest() {
        changedMilestones[milestoneIdx].testCases = eachTestTypeData["function"];
        return (
            <>
                <Title>Function name</Title>
                <SingleInput
                    defaultValue={functionName}
                    name="functionName"
                    onChange={handleFunctionNameChange}
                    required
                ></SingleInput>
                <Title>Test cases</Title>
                {
                    eachTestTypeData["function"].map((testCase, idx) => {
                        return (
                            <EachTestCaseBlock key={idx}>
                                <EachTestCaseInputBlock>
                                    <label>Case name</label>
                                    <TestCaseInput
                                        defaultValue={testCase.case}
                                        onChange={(e) => handleFunctionCaseChange(e, idx, "case")}
                                        required
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Case Input 1</label>
                                    <TestCaseInput
                                        defaultValue={testCase.inputs[0]}
                                        style={{width: "250px"}}
                                        onChange={(e) => handleFunctionCaseInputsChange(e, idx, "inputs", 0)}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Case Input 2</label>
                                    <TestCaseInput
                                        defaultValue={testCase.inputs[1]}
                                        style={{width: "250px"}}
                                        onChange={(e) => handleFunctionCaseInputsChange(e, idx, "inputs", 1)}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Expected result</label>
                                    <TestCaseInput
                                        defaultValue={testCase.result}
                                        onChange={(e) => handleFunctionCaseChange(e, idx, "result")}
                                        required
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                            </EachTestCaseBlock>
                        )
                    })
                }
                <div style={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "20px"
                }}>
                    <CaseControlBtn>
                        <CaseControlBtnSpan onClick={() => removeTestCase("function")}>
                            -
                        </CaseControlBtnSpan>
                    </CaseControlBtn>
                    <CaseControlBtn>
                        <CaseControlBtnSpan onClick={() => addTestCase("function")}>
                            +
                        </CaseControlBtnSpan>
                    </CaseControlBtn>
                </div>
            </>
        )
    }

    function renderAPITest() {
        changedMilestones[milestoneIdx].testCases = eachTestTypeData["api"];
        return (
            <>
                {
                    eachTestTypeData["api"].map((testCase, idx) => {
                        return (
                            <EachTestCaseBlock key={idx}>
                                <EachTestCaseInputBlock>
                                    <label>Case name</label>
                                    <TestCaseInput
                                        defaultValue={testCase.case}
                                        onChange={(e) => handleAPICaseChange(e, idx, "case")}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Method</label>
                                    <TestCaseInput
                                        defaultValue={testCase.method}
                                        style={{width: "250px"}}
                                        onChange={(e) => handleAPICaseChange(e, idx, "method")}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Expected status code</label>
                                    <TestCaseInput
                                        defaultValue={testCase.statusCode}
                                        onChange={(e) => handleAPICaseChange(e, idx, "statusCode")}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Expected result</label>
                                    <TextArea
                                        defaultValue={testCase.result}
                                        onChange={(e) => handleAPICaseChange(e, idx, "result")}
                                    ></TextArea>
                                </EachTestCaseInputBlock>
                            </EachTestCaseBlock>
                        )
                    })
                }
                <div style={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "20px"
                }}>
                    <CaseControlBtn>
                        <CaseControlBtnSpan onClick={() => removeTestCase("api")}>
                            -
                        </CaseControlBtnSpan>
                    </CaseControlBtn>
                    <CaseControlBtn>
                        <CaseControlBtnSpan onClick={() => addTestCase("api")}>
                            +
                        </CaseControlBtnSpan>
                    </CaseControlBtn>
                </div>
            </>
        )
    }

    function addTestCase(flag) {
        eachTestTypeData[flag].push({
            case: '',
            inputs: [],
            method: '',
            result: '',
            statusCode: ''
        });
        setEachTestTypeData(JSON.parse(JSON.stringify(eachTestTypeData)))
        changedMilestones[milestoneIdx].testCases = eachTestTypeData[flag].slice();
    }

    function removeTestCase(flag) {
        eachTestTypeData[flag].pop();
        setEachTestTypeData(JSON.parse(JSON.stringify(eachTestTypeData)))
        changedMilestones[milestoneIdx].testCases = eachTestTypeData[flag].slice();
    }

    return (
        <>
            {
                testType === 'function-test' ? renderFunctionTest() : renderAPITest()
            }
        </>
    )
}

export default SettingTestCase;
