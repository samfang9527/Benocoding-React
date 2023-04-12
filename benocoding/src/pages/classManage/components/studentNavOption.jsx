
import styled from "styled-components";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { BsGithub } from "react-icons/bs";

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EachIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-weight: bolder;
    padding: 22px;
    width: 100%;

    :hover {
        background-color: NavajoWhite;
    }

    :focus {
        background-color: NavajoWhite;
    }
`;

const Title = styled.p`
    display: ${props => props.isExpanded ? 'inline' : 'none'};
    vertical-align: super;
    margin: 10px 0 10px 10px;
    font-size: 20px;
    letter-spacing: 1px;
    transition: display 1s ease-in-out;

`;

const StudentNavOption = ({isExpanded}) => {

    return (
        <IconWrapper>
            <EachIcon>
                <DescriptionOutlinedIcon sx={{
                    width: 30,
                    height: 30
                }}></DescriptionOutlinedIcon>
                <Title isExpanded={isExpanded}>Class info</Title>
            </EachIcon>
            <EachIcon>
                <GroupsOutlinedIcon sx={{
                    width: 30,
                    height: 30
                }}></GroupsOutlinedIcon>
                <Title isExpanded={isExpanded}>Class member</Title>
            </EachIcon>
            <EachIcon>
                <ChatOutlinedIcon sx={{
                    width: 30,
                    height: 30
                }}></ChatOutlinedIcon>
                <Title isExpanded={isExpanded}>Chatroom</Title>
            </EachIcon>
            <EachIcon>
                <BsGithub size={30} style={{minWidth: 30}}></BsGithub>
                <Title isExpanded={isExpanded}>Pull request</Title>
            </EachIcon>
            <EachIcon>
                <AssignmentIcon sx={{
                    width: 30,
                    height: 30
                }}></AssignmentIcon>
                <Title isExpanded={isExpanded}>Milestones</Title>
            </EachIcon>
        </IconWrapper>
    )
}

export default StudentNavOption;
