
import styled from "styled-components";

const Milestones = styled.div`

`;

const BlockUl = styled.ul`
    list-style: none;
    font-size: 20px;
    letter-spacing: 2px;
    text-align: left;
    padding: 0 0 0 15px;
    margin-top: 0;
`;

const TitleLi = styled.li`
    margin: 10px 0;
    padding: 5px 10px 10px 10px;
`;

const ViewClassInfoItem = ({milestoneData}) => {
    return (
        <Milestones>
            <BlockUl>
                <TitleLi>Milestone: {milestoneData.milestone}</TitleLi>
                <TitleLi>Milestone Description:<br></br>{milestoneData.milestoneDesc}</TitleLi>
                <TitleLi>Status: {milestoneData.passed ? 'Passed' : 'Not passed'}</TitleLi>
            </BlockUl>
        </Milestones>
    )
}

export default ViewClassInfoItem;