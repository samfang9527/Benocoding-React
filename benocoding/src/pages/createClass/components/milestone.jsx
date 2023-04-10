
import styled from "styled-components";
import { useState, useContext } from "react";
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

const OptionButtonBlock = styled.div`

`;

const OptionButton = styled.button`
    width: 200px;
    height: 70px;
    border-radius: 50px;
    font-size: 20px;
    background-color: MediumSeaGreen;
    color: white;
    margin: 0 15px;
    cursor: pointer;

    :hover {
        background-color: ForestGreen;
    }

    :focus {
        background-color: ForestGreen;
    }
`;

const ControlBtnContainer = styled.div`
    display: flex;
`;

const ControlBtn = styled.button`
    height: 40px;
    width: 40px;
    background-color: DeepPink;
    font-size: 30px;
    color: white;
    cursor: pointer;
    margin: 0 10px;

    :hover {
        background-color: HotPink;
    }
`;

const Milestone = ({idx}) => {

    const milestoneContext = useContext(MilestoneContext);
    console.log(milestoneContext);

    const [ useTest, setUseTest ] = useState(milestoneContext.useAutoTest);
    const [ useFunctionTest, setUseFunctionTest ] = useState(milestoneContext.useFunctionTest);
    const [ testCases, setTestCases ] = useState(milestoneContext.testCases);

    function functionTest(e) {
        e.preventDefault();
        milestoneContext.setUseFunctionTest(true);
        milestoneContext.setUseAutoTest(true);
    }

    function apiTest(e) {
        e.preventDefault();
        milestoneContext.setUseFunctionTest(false);
        milestoneContext.setUseAutoTest(true);
    }

    function noneTest(e) {
        e.preventDefault();
        milestoneContext.setUseAutoTest(false);
    }

    function addCases(e) {
        e.preventDefault();
        const newTestCase = {
            params: '',
            values: '',
            result: ''
        };
        const newArray = [...milestoneContext.testCases, newTestCase];
        milestoneContext.setTestCases(newArray);
        console.log(newArray);
    }

    function removeCases(e) {
        e.preventDefault();
        const newArray = milestoneContext.testCases.slice(0, -1);
        milestoneContext.setTestCases(newArray);
        console.log(newArray);
    }

    function setMilestoneName(e) {
        milestoneContext.setMilestones(prev => {
            prev[idx].milestone = e.target.value
            return [...prev];
        })
    }

    function setMilestoneDesc(e) {
        milestoneContext.setMilestones(prev => {
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
            <OptionButtonBlock>
                <OptionButton onClick={functionTest}>Function Test</OptionButton>
                <OptionButton onClick={apiTest}>API Test</OptionButton>
                <OptionButton onClick={noneTest}>None</OptionButton>
            </OptionButtonBlock>
            { useTest ?
                <>
                    { useFunctionTest ? <FunctionTest milestoneIdx={idx}/> : <ApiTest milestoneIdx={idx}/> }
                    <ControlBtnContainer>
                        <ControlBtn onClick={addCases}>+</ControlBtn>
                        { testCases.length > 1 ? <ControlBtn onClick={removeCases}>-</ControlBtn> : ''}
                    </ControlBtnContainer>
                </>
            : ''}
            <Title></Title>
        </MilestoneWrapper>
    )
    
}

export default Milestone;