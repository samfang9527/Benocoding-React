
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { getClassData } from "../../utils/apis/class.js";
import { getUserMilestoneData } from "../../utils/apis/user.js";
import { AuthContext } from "../../global/authContext.jsx";
import TeacherNavOption from "./components/teacherNavOption.jsx";
import StudentNavOption from "./components/studentNavOption.jsx";
import Chatroom from "./components/chatroom.jsx";
import Members from "./components/members.jsx";
import ClassInfo from "./components/classInfo.jsx";
import Milestone from "./components/milestone.jsx";
import PullRequest from "./components/pullRequest.jsx";
import Settings from "./components/settings.jsx";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { CustomErrorAlert, ServerErrorAlert } from "../../utils/alert.js";

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
`;

const ClassManage = () => {

    const navigate = useNavigate();
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
            return <Milestone milestoneData={milestones} classData={classData} />;
        }

        if ( chosenOption === "pull-request" ) {
            return <PullRequest classData={classData} />;
        }

        if ( chosenOption === "class-settings" ) {
            const mutableData = {
                className: classData.className,
                classDesc: classData.classDesc,
                classStartDate: classData.classStartDate.slice(0, 10),
                classEndDate: classData.classEndDate.slice(0, 10),
                // milestones: classData.milestones,
                classImage: classData.classImage,
                classVideo: classData.classVideo,
                // gitHub: classData.gitHub
            }
            return <Settings mutableData={mutableData} classId={classData.id}/>;
        }
    }

    useEffect(() => {
        if ( !authContext.isLoading ) {

            // check user signin
            const { user } = authContext;
            if ( Object.keys(user).length === 0 ) {
                CustomErrorAlert( 'Please sign in to continue' )
                .then(result => {
                    if ( result.isConfirmed || result.isDismissed ) {
                        navigate('/login');
                    }
                })
            }

            const path = location.pathname;
            const classId = path.slice(path.lastIndexOf('/') + 1);

            getClassData(classId)
                .then(response => {
                    if ( response && response.response.statusCode === 200 ) {
                        const classData = response;
                        setClassData(classData);

                        // options
                        response.ownerId === user.userId ? setIsCreater(true) : setIsCreater(false);
                        
                        // members
                        setMembers(response.classMembers);
                    } else {
                        CustomErrorAlert( response.response.responseMessage )
                        .then(result => {
                            if ( result.isConfirmed || result.isDismissed ) {
                                navigate('/learner');
                            }
                        })
                    }
                    
                })
                .catch(err => {
                    console.error(err)
                    ServerErrorAlert()
                    .then(result => {
                        if ( result.isConfirmed || result.isDismissed ) {
                            navigate('/learner');
                        }
                    })
                })
            
                getUserMilestoneData(user.userId, classId)
                    .then(res => {
                        const { response } = res;
                        if ( response && response.statusCode === 200 ) {
                            const milestoneData = res.milestones;
                            setMilestones(milestoneData);
                        } else {
                            CustomErrorAlert( response.responseMessage )
                            .then(result => {
                                if ( result.isConfirmed || result.isDismissed ) {
                                    navigate('/learner');
                                }
                            })
                        }
                        
                    })
                    .catch(err => {console.error(err)})
        }
    }, [authContext, navigate, location, user.userId])

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

