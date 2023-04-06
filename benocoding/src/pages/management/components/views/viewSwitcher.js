
import ViewClassInfo from "./viewClassInfo";
import ViewChatroom from "./viewChatroom";

function chooseView(viewData, clickedOption) {
    if ( clickedOption === "class info" ) {
        return <ViewClassInfo viewData={viewData}/>
    }

    if ( clickedOption === "chatroom" ) {
        return <ViewChatroom viewData={viewData}/>
    }

}

const ViewSwitcher = ({viewData, clickedOption}) => {
    return (
        <div>
            {chooseView(viewData, clickedOption)}
        </div>   
    )
}

export default ViewSwitcher;