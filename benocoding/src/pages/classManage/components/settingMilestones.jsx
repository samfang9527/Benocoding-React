
import styled from "styled-components";
import { useState } from "react";
import { Fragment } from "react";

const MilestoneBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10px 0;
    border: 1px solid black;
`;

const Title = styled.p`
    font-size: 28px;
`;

const SingleInput = styled.input`
    height: 50px;
    width: 90%;
    padding: 5px 10px;
    font-size: 20px;
`;

const TextArea = styled.textarea`
    width: 90%;
    height: 400px;
    overflow: scroll;
    font-size: 18px;
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

const ShowDetailCheck = styled.input`
    --size: 80px;
    -webkit-appearance: none;
    width: var(--size);
    height: calc(var(--size) / 2);
    background-color: #fff;
    border: 3px solid #222;
    border-radius: 30px 100px 100px 100px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    outline: none;
    cursor: pointer;
    position: relative;
    transition: all 0.5s;
    margin: 0 0 20px 0;

    ::before {
        content: "";
        position: absolute;
        width: calc(var(--size) / 2);
        height: calc(var(--size) / 2);
        left: 0;
        top: 50%;
        transform: translateY(-50%) scale(0.7);
        border: 3px solid #222;
        border-radius: 30px 100px 100px 100px;
        background-color: #fde881;
        box-sizing: border-box;
        transition: all 0.5s;
    }

    :checked {
        background-color: #fde881;
        border-radius: 100px 100px 30px 100px;
    }

    :checked::before {
        left: 50%;
        background-color: #fff;
        border-radius: 100px 100px 30px 100px;
    }
`;

const TestOptionWrapper = styled.div`
    --font-color-dark: #323232;
    --font-color-light: #FFF;
    --bg-color: #fff;
    --main-color: #323232;
    position: relative;
    width: 450px;
    height: 50px;
    background-color: var(--bg-color);
    border: 2px solid var(--main-color);
    border-radius: 34px;
    display: flex;
    flex-direction: row;
    box-shadow: 4px 4px var(--main-color);
    margin: 0 0 20px 0;
`;

const TestOption = styled.div`
    width: 147px;
    height: 42px;
    position: relative;
    top: 2px;
    left: 2px;
`;

const TestOptionInput = styled.input`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    appearance: none;
    cursor: pointer;
`;

const TestOptionBtn = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.isChecked ? "var(--main-color)" : ""};
    color: ${props => props.isChecked ? "var(--font-color-light)" : ""};
`;

const TestOptionSpan = styled.span`
    background-color: ${props => props.isChecked ? "var(--main-color)" : ""};
    color: ${props => props.isChecked ? "var(--font-color-light)" : ""};
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

const SettingMilestone = ({ milestones, changedMilestones, setChangedMilestones }) => {

    const [ showingList, setShowingList ] = useState(milestones.map(() => false));
    const [ testTypeList, setTestTypeList ] = useState(milestones.map((m) => {
        const { autoTest, functionTest } = m
        if ( !autoTest ) { return 'no-test' }
        if ( !functionTest ) { return 'api-test' }
        return 'function-test'
    }))
    console.log(changedMilestones);

    function renderFunctionTest(functionName, testCases, milestoneIdx) {
        return (
            <>
                <Title>Function name</Title>
                <SingleInput defaultValue={functionName}></SingleInput>
                <Title>Test cases</Title>
                {
                    testCases.map((testCase, idx) => {
                        return (
                            <EachTestCaseBlock key={testCase.case + idx}>
                                <EachTestCaseInputBlock>
                                    <label>Case name</label>
                                    <TestCaseInput
                                        defaultValue={testCase.case}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Case Input 1</label>
                                    <TestCaseInput
                                        defaultValue={testCase.inputs[0]}
                                        style={{width: "250px"}}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Case Input 2</label>
                                    <TestCaseInput
                                        defaultValue={testCase.inputs[1]}
                                        style={{width: "250px"}}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Expected result</label>
                                    <TestCaseInput defaultValue={testCase.result}></TestCaseInput>
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
                        <CaseControlBtnSpan onClick={() => removeTestCase(milestoneIdx)}>
                            -
                        </CaseControlBtnSpan>
                    </CaseControlBtn>
                    <CaseControlBtn>
                        <CaseControlBtnSpan onClick={() => addTestCase(milestoneIdx)}>
                            +
                        </CaseControlBtnSpan>
                    </CaseControlBtn>
                </div>
            </>
        )
    }

    function renderAPITest(testCases, milestoneIdx) {
        return (
            <>
                {
                    testCases.map((testCase, idx) => {
                        return (
                            <EachTestCaseBlock key={testCase.case + idx}>
                                <EachTestCaseInputBlock>
                                    <label>Case name</label>
                                    <TestCaseInput
                                        defaultValue={testCase.case}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Method</label>
                                    <TestCaseInput
                                        defaultValue={testCase.method}
                                        style={{width: "250px"}}
                                    ></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Expected status code</label>
                                    <TestCaseInput defaultValue={testCase.statusCode}></TestCaseInput>
                                </EachTestCaseInputBlock>
                                <EachTestCaseInputBlock>
                                    <label>Expected result</label>
                                    <TestCaseInput defaultValue={testCase.result}></TestCaseInput>
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
                        <CaseControlBtnSpan onClick={() => removeTestCase(milestoneIdx)}>
                            -
                        </CaseControlBtnSpan>
                    </CaseControlBtn>
                    <CaseControlBtn>
                        <CaseControlBtnSpan onClick={() => addTestCase(milestoneIdx)}>
                            +
                        </CaseControlBtnSpan>
                    </CaseControlBtn>
                </div>
            </>
        )
    }

    function addTestCase(idx) {
        const { testCases } = changedMilestones[idx];
        testCases.push({
            case: '',
            inputs: [],
            method: '',
            result: '',
            statusCode: ''
        })
        setChangedMilestones(changedMilestones.slice());
    }

    function removeTestCase(idx) {
        const { testCases } = changedMilestones[idx];
        testCases.pop();
        setChangedMilestones(changedMilestones.slice());
    }

    function handleShowMilestone(idx) {
        showingList[idx] = !showingList[idx];
        setShowingList(showingList.slice());
    }

    function handleTestChange(e, idx) {
        const choice = e.target.value;
        testTypeList[idx] = choice;
        setTestTypeList(testTypeList.slice());
    }

    function handleTestView(type, milestoneData, idx) {
        const { autoTest, functionTest } = milestoneData;
        if ( type === 'function-test' ) {
            changedMilestones[idx]["autoTest"] = true;
            changedMilestones[idx]["functionTest"] = true;
            if ( autoTest && functionTest ) {
                const { functionName, testCases } = milestoneData;
                return renderFunctionTest(functionName, testCases, idx);
            } else {
                return renderFunctionTest('', [], idx);
            }
        } else if ( type === 'api-test' ) {
            changedMilestones[idx]["autoTest"] = true;
            changedMilestones[idx]["functionTest"] = false;
            if ( autoTest && !functionTest ) {
                const { testCases } = milestoneData;
                return renderAPITest(testCases, idx);
            } else {
                return renderAPITest([], idx);
            }
        } else {
            changedMilestones[idx]["autoTest"] = false;
            changedMilestones[idx]["functionTest"] = false;
            return;
        }
    }
    
    return (
        milestones.map((milestone, milestoneIdx) => {

            const { milestoneDesc } = milestone;

            return (
                <Fragment key={milestone.milestone + milestoneIdx}>
                    <MilestoneBlock>
                        <Title>{`Milestone ${milestoneIdx}`}</Title>
                        <ShowDetailCheck onChange={() => handleShowMilestone(milestoneIdx)} type="checkbox"></ShowDetailCheck>
                        { showingList[milestoneIdx] ? 
                            <>
                                <SingleInput
                                    name={`milestone-${milestoneIdx}`}
                                    defaultValue={milestone.milestone}
                                ></SingleInput>
                                <Title>Milestone description</Title>
                                <TextArea defaultValue={milestoneDesc}></TextArea>
                                <Title>Automation test</Title>
                                <TestOptionWrapper>
                                    <TestOption>
                                        <TestOptionInput type="radio" name="btn" value="function-test" onChange={(e) => handleTestChange(e, milestoneIdx)} checked={testTypeList[milestoneIdx] === "function-test"}/>
                                        <TestOptionBtn isChecked={testTypeList[milestoneIdx] === "function-test"}>
                                            <TestOptionSpan isChecked={testTypeList[milestoneIdx] === "function-test"}>Function test</TestOptionSpan>
                                        </TestOptionBtn>
                                    </TestOption>
                                    <TestOption>
                                        <TestOptionInput type="radio" name="btn" value="api-test" onChange={(e) => handleTestChange(e, milestoneIdx)} checked={testTypeList[milestoneIdx] === "api-test"}/>
                                        <TestOptionBtn isChecked={testTypeList[milestoneIdx] === "api-test"}>
                                            <TestOptionSpan isChecked={testTypeList[milestoneIdx] === "api-test"}>API test</TestOptionSpan>
                                        </TestOptionBtn>
                                    </TestOption>
                                    <TestOption>
                                        <TestOptionInput type="radio" name="btn" value="no-test" onChange={(e) => handleTestChange(e, milestoneIdx)} checked={testTypeList[milestoneIdx] === "no-test"}/>
                                        <TestOptionBtn isChecked={testTypeList[milestoneIdx] === "no-test"}>
                                            <TestOptionSpan isChecked={testTypeList[milestoneIdx] === "no-test"}>No test</TestOptionSpan>
                                        </TestOptionBtn>  
                                    </TestOption>
                                </TestOptionWrapper>
                                { handleTestView(testTypeList[milestoneIdx], milestone, milestoneIdx) }
                            </>
                        : "" }
                        
                    </MilestoneBlock>
                </Fragment>
            )
        })
    )
}

export default SettingMilestone;
