
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

const Milestone = ({idx}) => {

    const [useAutoTest, setUseAutoTest] = useState(false);
    const [useFunctionTest, setUseFunctionTest] = useState(false);

    const { setMilestones } = useContext(MilestoneContext);

    function functionTest(e) {
        e.preventDefault();
        setUseFunctionTest(true);
        setUseAutoTest(true);
    }

    function apiTest(e) {
        e.preventDefault();
        setUseFunctionTest(false);
        setUseAutoTest(true);
    }

    function noneTest(e) {
        e.preventDefault();
        setUseAutoTest(false);
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
            <OptionButtonBlock>
                <OptionButton onClick={functionTest}>Function Test</OptionButton>
                <OptionButton onClick={apiTest}>API Test</OptionButton>
                <OptionButton onClick={noneTest}>None</OptionButton>
            </OptionButtonBlock>
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