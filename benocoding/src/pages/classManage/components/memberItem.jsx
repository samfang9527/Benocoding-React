
import styled from "styled-components";
import axios from "axios";
import EmailIcon from '@mui/icons-material/Email';
import { useState, useEffect } from "react";

const ItemList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 90%;
    background-color: MediumAquamarine;
    position: relative;
    left: 50%;
    margin: 40px 0 40px -45%;
    border-radius: 10px;
`;

const Item = styled.li`
    height: 100px;
    width: 90%;
    display: flex;
    align-items: center;
    border: 1px solid none;
    border-radius: 10px;
    padding: 0 5px;
    position: relative;
    left: 50%;
    margin-left: -45%;
`;

const InfoBlock = styled.div`
    font-size: 22px;
    display: flex;
    flex-grow: 2;
    letter-spacing: 2px;
`;

const Info = styled.p`
    padding: 0 40px 0 0;
`;


async function fetchUserMilestones(classId, userId) {

    const graphqlQuery = {
        query: `
            query($userClassId: String!, $userId: String!) {
                milestones(userClassId: $userClassId, userId: $userId) {
                    milestone,
                    milestoneDesc,
                    passed
                }
            }
        `,
        variables: {
            userClassId: classId,
            userId: userId
        }
    }

    const { data } = await axios({
        method: "POST",
        url: "http://localhost:8080/graphql",
        headers: {
            "Content-Type": "application/json"
        },
        data: graphqlQuery
    })
    return data;
}

function calculateProgress(milestones) {
    for ( let i = 0; i < milestones.length; i++ ) {
        const milestone = milestones[i];
        if ( !milestone.passed ) {
            return i;
        }
    }
    return milestones.length;
}

const MemberItem = ({userInfo, classData}) => {

    const [milestones, setMilestones] = useState([]);
    const [curMilestone, setCurMilestone] = useState(0);

    const {
        userId,
        username,
        email
    } = userInfo;

    const {
        classId,
        ownerId
    } = classData

    useEffect(() => {
        if ( classId && userId ) {
            fetchUserMilestones(classId, userId)
                .then(response => {
                    const { milestones } = response.data;
                    setMilestones(milestones);

                    // cur milestone
                    const curMilestone = calculateProgress(milestones);
                    setCurMilestone(curMilestone);
                })
                .catch(err => console.error(err))
        }
    }, [classId, userId])

    return (
        <ItemList>
            <Item>
                <InfoBlock>
                    <Info>Name： {username}</Info>
                    {
                        userId === ownerId ? <Info>Teacher</Info> : 
                        <>
                            <Info>Current at milestone {curMilestone}</Info>
                            <Info>Progress： {(curMilestone / milestones.length) * 100}%</Info>
                        </>
                    }
                    
                </InfoBlock>
                <a href={`mailto:${email}`} style={{textDecoration: "none", color: "white"}}><EmailIcon sx={{ fontSize: 40 }}/></a>
            </Item>
            
        </ItemList>
    )

}

export default MemberItem;