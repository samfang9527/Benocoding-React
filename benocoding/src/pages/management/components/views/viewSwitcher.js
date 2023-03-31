
import ViewClassInfo from "./viewClassInfo";

function chooseView(viewData, clickedOption) {
    if ( clickedOption === "classInfo" ) {
        console.log('Hi I am here');
        return <ViewClassInfo viewData={viewData}/>
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