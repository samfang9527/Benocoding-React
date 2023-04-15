
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { getClassData } from "../../utils/apis/class.js";
import { AuthContext } from "../../global/authContext.jsx";
import TeacherNavOption from "./components/teacherNavOption.jsx";
import StudentNavOption from "./components/studentNavOption.jsx";
import Chatroom from "./components/chatroom.jsx";
import Members from "./components/members.jsx";
import ClassInfo from "./components/classInfo.jsx";
import Milestone from "./components/milestone.jsx";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const MainContainer = styled.main`
    display: flex;
    min-height: 80vh;
`;

const SideNavWrapper = styled.div`
    background-color: #E0E2DB;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const SideNavBlock = styled.nav`
    width: ${props => props.isExpanded ? '200px' : '80px'};
    color: rgba(0, 0, 0, 0.9);
    z-index: 1;
    border-radius: 0 8px 8px 0;
    transition: width 0.2s ease-in-out;
`

const CustomIconBtn = styled(IconButton)`
    height: 80px;
    width: 80px;
`;

const ViewWrapper = styled.div`
    height: 'fit-content';
    width: 95%;
`

const ClassManage = () => {

    const location = useLocation();
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const [ classData, setClassData ] = useState({});
    const [ members, setMembers ] = useState([]);
    const [ milestones, setMilestones ] = useState([]);
    const [ isCreater, setIsCreater ] = useState(true);
    const [ isNavExpanded, setIsNavExpanded ] = useState(false);
    const [ chosenOption, setChosenOption ] = useState('class-info');
    
    function handleExpand() {
        isNavExpanded ? setIsNavExpanded(false) : setIsNavExpanded(true);
    }

    function handleView() {
        if ( chosenOption === "class-info" ) {
            return <ClassInfo classData={classData} />;
        }

        if ( chosenOption === "class-member" ) {
            return <Members memberData={members} classData={classData} />;
        }

        if ( chosenOption === "chatroom" ) {
            return <Chatroom classData={classData} />;
        }

        if ( chosenOption === "milestones" ) {
            return <Milestone milestoneData={milestones} />;
        }
    }

    useEffect(() => {
        if ( !authContext.isLoading ) {
            const path = location.pathname;
            const classId = path.slice(path.lastIndexOf('/') + 1);

            getClassData(classId)
                .then(response => {
                    const classData = response.class;
                    console.log(classData);
                    setClassData(classData);

                    // options
                    classData.ownerId === user.userId ? setIsCreater(true) : setIsCreater(false);
                    
                    // members
                    setMembers(classData.classMembers);

                    // milestones
                    setMilestones(classData.milestones);
                })
                .catch(err => console.error(err))
        }
    }, [authContext.isLoading, location, user.userId])

    return (
        <MainContainer>
            <SideNavWrapper>
                <CustomIconBtn onClick={handleExpand} sx={{color: "darkgreen"}}>
                    <MenuIcon fontSize="large" />
                </CustomIconBtn>
                <SideNavBlock
                    isExpanded={isNavExpanded}
                >
                    {
                        isCreater ?
                            <TeacherNavOption isExpanded={isNavExpanded} setChosenOption={setChosenOption} /> :
                            <StudentNavOption isExpanded={isNavExpanded} setChosenOption={setChosenOption} />
                    }
                </SideNavBlock>
            </SideNavWrapper>
            <ViewWrapper>
                { handleView() }
            </ViewWrapper>
        </MainContainer>  
    )
}

export default ClassManage;

