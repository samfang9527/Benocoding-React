
import styled from "styled-components";
import ViewMilestoneItem from "./viewMilestoneItem";

const MilestoneWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ViewMilestones = ({viewData}) => {

    const milestones = viewData.milestones;

    return (
        <MilestoneWrapper>
            {
                milestones.map((milestone, idx) => {
                    return (
                        <ViewMilestoneItem
                            key={idx + milestone.milestone}
                            milestone={milestone}
                            idx={idx}
                        ></ViewMilestoneItem>
                    )
                })
            }
        </MilestoneWrapper>
    )
}

export default ViewMilestones;
