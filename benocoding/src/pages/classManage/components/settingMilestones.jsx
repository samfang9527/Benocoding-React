
import styled from "styled-components";
import { useState, useContext } from "react";
import { Fragment } from "react";
import SettingTestCase from "./settingTestCase";
import { MilestoneContext } from "./settings";

const MilestoneBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10px 0;
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

const SettingMilestone = ({ milestones }) => {

    const milestoneContext = useContext(MilestoneContext);
    const { changedMilestones } = milestoneContext;

    const [ showingList, setShowingList ] = useState(milestones.map(() => false));
    const [ testTypeList, setTestTypeList ] = useState(milestones.map((m) => {
        const { autoTest, functionTest } = m
        if ( !autoTest ) { return 'no-test' }
        if ( !functionTest ) { return 'api-test' }
        return 'function-test'
    }))

    function handleShowMilestone(idx) {
        showingList[idx] = !showingList[idx];
        setShowingList(showingList.slice());
    }

    function handleTestChange(e, idx) {
        const choice = e.target.value;
        testTypeList[idx] = choice;
        setTestTypeList(testTypeList.slice());

        if ( choice === "function-test" ) {
            changedMilestones[idx].autoTest = true;
            changedMilestones[idx].functionTest = true;

        } else if ( choice === "api-test" ) {
            changedMilestones[idx].autoTest = true;
            changedMilestones[idx].functionTest = false;
        } else {
            changedMilestones[idx].autoTest = false;
            changedMilestones[idx].functionTest = false;
        }
    }

    function handleInputChange(e, name, idx) {
        e.preventDefault();
        changedMilestones[idx][name] = e.target.value;
    }
    
    return (
        milestones.map((milestone, milestoneIdx) => {

            const { milestoneDesc } = milestone;

            return (
                <Fragment key={milestone.milestone + milestoneIdx}>
                    <MilestoneBlock>
                        <Title style={{margin: "10px 0"}}>{`Milestone ${milestoneIdx}`}</Title>
                        <hr style={{width: "15%", border: "1px solid black"}}/>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{margin: "10px 0"}}>Show details</p>
                            <ShowDetailCheck onChange={() => handleShowMilestone(milestoneIdx)} type="checkbox"></ShowDetailCheck>
                        </div>
                        { showingList[milestoneIdx] ? 
                            <>
                                <SingleInput
                                    name={`milestone-${milestoneIdx}`}
                                    defaultValue={milestone.milestone}
                                    onChange={(e) => handleInputChange(e, "milestone", milestoneIdx)}
                                ></SingleInput>
                                <Title>Milestone description</Title>
                                <TextArea
                                    defaultValue={milestoneDesc}
                                    onChange={(e) => handleInputChange(e, "milestoneDesc", milestoneIdx)}
                                ></TextArea>
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
                                {
                                    testTypeList[milestoneIdx] === "no-test" ? ""
                                        : <SettingTestCase testType={testTypeList[milestoneIdx]} milestoneData={milestone} milestoneIdx={milestoneIdx} />
                                }
                            </>
                        : "" }
                    </MilestoneBlock>
                    <hr style={{width: "90%"}}/>
                </Fragment>
            )
        })
    )
}

export default SettingMilestone;
