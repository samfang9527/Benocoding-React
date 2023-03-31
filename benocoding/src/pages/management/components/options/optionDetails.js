
import ClassInfo from "../views/viewClassInfo";

function chooseView(viewData, clickedOption) {
    if ( clickedOption === "classInfo" ) {
        console.log('Hi I am here');
        return <ClassInfo viewData={viewData}/>
    }
}

const OptionDetails = ({viewData, clickedOption}) => {
    return (
        <div>
            {chooseView(viewData, clickedOption)}
        </div>   
    )
}

export default OptionDetails;