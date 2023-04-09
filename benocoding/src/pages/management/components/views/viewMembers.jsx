
import styled from "styled-components";
import React from 'react';
import ViewMemberItem from "./viewMemberItem";


const ViewMembers = ({viewData}) => {

    const members = viewData.classMembers;

    return (
        members.map((member, idx) => {
            return <ViewMemberItem username={member.username} email={member.email} userId={member.userId} classId={viewData.id} key={idx}/>
        })  
    );

}

export default ViewMembers;