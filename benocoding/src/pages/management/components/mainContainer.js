
import styled from "styled-components";
import ClassList from "./class/classList";
import ClassOptions from "./options/optionList";
import OptionView from "./options/optionView";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../../utils/apis/user.js";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const MainContainer = () => {

    const [classInfos, setClassInfos] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [viewData, setViewData] = useState({});
    const [clickedOption, setClickedOption] = useState('');

    useEffect(() => {
        fetchUserData(setClassInfos)
    }, [])

    return (
        <Container>
            <ClassList 
                classInfos={classInfos}
                chooseClass={setClassOptions}
                setViewData={setViewData}
            />
            <ClassOptions
                classOptions={classOptions}
                setClickedOption={setClickedOption}
            />
            <OptionView viewData={viewData} clickedOption={clickedOption}/>
        </Container>
    )
}

export default MainContainer;