
import styled from "styled-components";
import axios from "axios";
import EmailIcon from '@mui/icons-material/Email';
import { useState, useEffect } from "react";

const ItemList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
`;

const Item = styled.li`
    height: 100px;
    width: 90%;
    display: flex;
    align-items: center;
    border: 1px solid none;
    border-radius: 10px;
    padding: 0 20px;
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


async function fetchUserMilestones(classId, userId, setMilestones) {

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
    setMilestones(data.data.milestones);
}

const ViewMemberItem = ({username, email, userId, classId}) => {

    const [milestones, setMilestones] = useState([]);
    const [curMilestone, setCurMilestone] = useState(0);

    useEffect(() => {
        fetchUserMilestones(classId, userId, setMilestones);
        calculateProgress();
    }, [])
    
    function calculateProgress() {
        for ( let i = 0; i < milestones.length; i++ ) {
            const milestone = milestones[i];
            if ( !milestone.passed ) {
                setCurMilestone(i);
            }
        }
        setCurMilestone(milestones.length)
    }

    function chooseColor() {
        const colorList = ['Crimson', 'Coral', 'MediumSeaGreen']
        const progress = (curMilestone / milestones.length) * 100;
        if ( progress < 40 ) {
            return colorList[0];
        }

        if ( progress < 80 ) {
            return colorList[1];
        } 
        return colorList[2];
    }

    return (
        <ItemList>
            <Item style={{backgroundColor: chooseColor()}}>
                <InfoBlock>
                    <Info>Name： {username}</Info>
                    <Info>Current at milestone {curMilestone}</Info>
                    <Info>Progress： {(curMilestone / milestones.length) * 100}%</Info>
                </InfoBlock>
                <a href={`mailto:${email}`} style={{textDecoration: "none", color: "white"}}><EmailIcon sx={{ fontSize: 40 }}/></a>
            </Item>
            
        </ItemList>
    )

}

export default ViewMemberItem;