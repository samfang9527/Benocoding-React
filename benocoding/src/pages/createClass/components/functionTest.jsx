
import styled from "styled-components";
import { useContext } from "react";
import { Fragment } from "react";
import { MilestoneContext } from "..";

const Wrapper = styled.div`
    width: 100%;
    margin: 30px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
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
`

const TestCaseBlock = styled.div`
    border: 1px solid white;
    margin: 15px;
    padding: 10px;
`;

const Description = styled.p`
    padding: 5px 20px;
    margin: 30px 0 10px 0;
`;

const TestCaseParam = styled.input`
    font-size: 20px;
    padding: 5px;
    text-align: center;
`

const TestCaseContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const FunctionTest = ({milestoneIdx}) => {

    const milestoneContext = useContext(MilestoneContext);

    return (
        <Wrapper>
            <Title>Function Name</Title>
            <FunctionName></FunctionName>
            <TestCaseContainer>
                {
                    milestoneContext.testCases.map((ele, idx) => {
                        return (
                            <Fragment key={ele + idx}>
                                <TestCaseBlock>
                                    <Title>Test Case {ele}</Title>
                                    <Description>Params</Description>
                                    <TestCaseParam></TestCaseParam>
                                    <Description>Values</Description>
                                    <TestCaseParam></TestCaseParam>
                                    <Description>Expected output</Description>
                                    <TestCaseParam style={{marginBottom: "20px"}}></TestCaseParam>
                                </TestCaseBlock>
                            </Fragment>
                        )
                    })
                }
            </TestCaseContainer>
        </Wrapper>
    )
}

export default FunctionTest;