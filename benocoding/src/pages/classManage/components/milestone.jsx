
import styled from "styled-components";
import MilestoneItem from "./milestoneItem";

const MilestoneWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Milestone = ({milestoneData}) => {

    const { milestone } = milestoneData;

    return (
        <MilestoneWrapper>
            {
                milestoneData.map((milestone, idx) => {
                    return (
                        <MilestoneItem
                            key={idx + milestone}
                            milestone={milestone}
                            idx={idx}
                        ></MilestoneItem>
                    )
                })
            }
        </MilestoneWrapper>
    )
}

export default Milestone;
