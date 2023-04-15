
import styled from "styled-components";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
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
    color: black;
    background: #E0E2DB;

    :hover {
        background-color: #D2D4C8;
    }

    :focus {
        background-color: #D2D4C8;
    }
`;

const Title = styled.p`
    display: ${props => props.isExpanded ? 'inline' : 'none'};
    vertical-align: super;
    margin: 10px 0 10px 10px;
    font-size: 20px;
    letter-spacing: 1px;
    transition: display 1s ease-in-out;
    text-align: left;
`;

const TeacherNavOption = ({isExpanded, setChosenOption}) => {

    return (
        <IconWrapper>
            <EachIcon onClick={() => setChosenOption('class-info')}>
                <DescriptionOutlinedIcon sx={{
                    width: 30,
                    height: 30
                }}></DescriptionOutlinedIcon>
                <Title isExpanded={isExpanded}>Class info</Title>
            </EachIcon>
            <EachIcon onClick={() => setChosenOption('class-member')}>
                <GroupsOutlinedIcon sx={{
                    width: 30,
                    height: 30
                }}></GroupsOutlinedIcon>
                <Title isExpanded={isExpanded}>Class member</Title>
            </EachIcon>
            <EachIcon onClick={() => setChosenOption('chatroom')}>
                <ChatOutlinedIcon sx={{
                    width: 30,
                    height: 30
                }}></ChatOutlinedIcon>
                <Title isExpanded={isExpanded}>Chatroom</Title>
            </EachIcon>
            <EachIcon onClick={() => setChosenOption('pull-request')}>
                <BsGithub size={30} style={{minWidth: 30}}></BsGithub>
                <Title isExpanded={isExpanded}>Pull request</Title>
            </EachIcon>
        </IconWrapper>
    )
}

export default TeacherNavOption;
