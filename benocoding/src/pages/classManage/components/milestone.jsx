
import styled from "styled-components";
import MilestoneItem from "./milestoneItem";

const MilestoneWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
`;

const Milestone = ({milestoneData, classData}) => {

    console.log(milestoneData);

    return (
        <MilestoneWrapper>
            {
                milestoneData.map((milestone, idx) => {
                    return (
                        <MilestoneItem
                            key={idx + milestone.milestone}
                            milestone={milestone}
                            idx={idx}
                            classId={classData.id}
                        ></MilestoneItem>
                    )
                })
            }
        </MilestoneWrapper>
    )
}

export default Milestone;
