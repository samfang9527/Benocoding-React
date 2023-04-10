
import ViewClassInfo from "./viewClassInfo";
import ViewChatroom from "./viewChatroom";
import ViewMembers from "./viewMembers";
import ViewMilestones from "./viewMilestones";

function chooseView(viewData, clickedOption) {
    if ( clickedOption === "class info" ) {
        return <ViewClassInfo viewData={viewData}/>;
    }

    if ( clickedOption === "chatroom" ) {
        return <ViewChatroom viewData={viewData}/>;
    }

    if ( clickedOption === "members" ) {
        return <ViewMembers viewData={viewData}/>;
    }

    if ( clickedOption === "milestones" ) {
        return <ViewMilestones viewData={viewData}/>
    }
}

const ViewSwitcher = ({viewData, clickedOption}) => {
    return (
        <>
            {chooseView(viewData, clickedOption)}
        </>   
    )
}

export default ViewSwitcher;