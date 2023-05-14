
import styled from "styled-components";
import { useContext, useState } from "react";
import FunctionTest from "./functionTest";
import ApiTest from "./apiTest";
import { MilestoneContext } from "..";

const MilestoneWrapper = styled.div`
    width: 90%;
    height: 100%;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const Title = styled.p`
    padding: 5px;
    font-size: 30px;
`;

const SingleLineQuestion = styled.input`
    height: 50px;
    width: 80%;
    border: 2px solid white;
    border-radius: 4px;
    padding: 10px;
    font-size: 24px;
    cursor: text;
`;

const MultiLineQuestion = styled.textarea`
    height: 200px;
    width: 80%;
    border: 2px solid white;
    border-radius: 4px;
    padding: 10px;
    font-size: 24px;
    cursor: text;
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
    font-size: 16px;
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
    color: ${props => props.isChecked ? "var(--font-color-light)" : "var(--font-color-dark)"};
`;

const Milestone = ({idx}) => {

    const [useAutoTest, setUseAutoTest] = useState(false);
    const [useFunctionTest, setUseFunctionTest] = useState(false);

    const { milestones, setMilestones } = useContext(MilestoneContext);

    function handleTestChange(e, type) {
        e.preventDefault();
        if ( type === "function-test" ) {
            setUseAutoTest(true);
            setUseFunctionTest(true);
            milestones[idx].autoTest = true;
            milestones[idx].functionTest = true;

        } else if ( type === "api-test" ) {
            setUseAutoTest(true);
            setUseFunctionTest(false);
            milestones[idx].autoTest = true;
            milestones[idx].functionTest = false;
        } else {
            setUseAutoTest(false);
            setUseFunctionTest(false);
            milestones[idx].autoTest = false;
            milestones[idx].functionTest = false;
        }
        setMilestones(milestones.slice());
    }

    function setMilestoneName(e) {
        setMilestones(prev => {
            prev[idx].milestone = e.target.value
            return [...prev];
        })
    }

    function setMilestoneDesc(e) {
        setMilestones(prev => {
            prev[idx].milestoneDesc = e.target.value
            return [...prev];
        })
    }

    return (
        <MilestoneWrapper id={`milestone-${idx}`}>
            <Title>{`Milestone ${idx}`}</Title>
            <SingleLineQuestion className="milestone-name" placeholder="milestone title" onChange={setMilestoneName} required/>
            <Title>Milestone description</Title>
            <MultiLineQuestion className="milestone-desc" placeholder="milestone description" onChange={setMilestoneDesc} required/>
            <Title>Auto-test options</Title>
            <TestOptionWrapper>
                <TestOption>
                    <TestOptionInput type="radio" name="btn" value="function-test" onChange={(e) => handleTestChange(e, "function-test")} checked={useAutoTest && useFunctionTest}/>
                    <TestOptionBtn isChecked={useAutoTest && useFunctionTest}>
                        <TestOptionSpan isChecked={useAutoTest && useFunctionTest}>Function test</TestOptionSpan>
                    </TestOptionBtn>
                </TestOption>
                <TestOption>
                    <TestOptionInput type="radio" name="btn" value="api-test" onChange={(e) => handleTestChange(e, "api-test")} checked={useAutoTest && !useFunctionTest}/>
                    <TestOptionBtn isChecked={useAutoTest && !useFunctionTest}>
                        <TestOptionSpan isChecked={useAutoTest && !useFunctionTest}>API test</TestOptionSpan>
                    </TestOptionBtn>
                </TestOption>
                <TestOption>
                    <TestOptionInput type="radio" name="btn" value="no-test" onChange={(e) => handleTestChange(e, "no-test")} checked={!useAutoTest}/>
                    <TestOptionBtn isChecked={!useAutoTest}>
                        <TestOptionSpan isChecked={!useAutoTest}>No test</TestOptionSpan>
                    </TestOptionBtn>  
                </TestOption>
            </TestOptionWrapper>
            { useAutoTest ?
                <>
                    { useFunctionTest ? <FunctionTest milestoneIdx={idx}/> : <ApiTest milestoneIdx={idx}/> }
                </>
            : ''}
            <Title></Title>
        </MilestoneWrapper>
    )
    
}

export default Milestone;