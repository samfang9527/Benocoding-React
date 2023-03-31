

import styled from "styled-components";
import ClassItem from "./classItem.js";

const ClassListContainer = styled.div`
    height: 80%;
    width: 20%;
    text-align: center;
    padding: 0 10px;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0 10px;
`;

const ClassList = ({classInfos, chooseClass, setViewData}) => {

    return (
        <ClassListContainer>
            <h2>你的課程</h2>
            {
                classInfos.map((data)=> {
                    return <ClassItem 
                    className={data.className} 
                    key={data.classId} 
                    chooseClass={chooseClass}
                    classId={data.classId}
                    setViewData={setViewData}
                    />
                })
            }
        </ClassListContainer>
    )
}

export default ClassList;