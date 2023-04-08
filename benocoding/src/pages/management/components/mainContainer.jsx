
import styled from "styled-components";
import ClassList from "./class/classList";
import OptionList from "./options/optionList";
import ViewContainer from "./views/viewContainer";
import { useEffect, useState, useContext } from "react";
import { fetchUserData } from "../../../utils/apis/user.js";
import { UserContext } from "..";

const Container = styled.div`
    height: 90vh;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
    left: 50%;
    margin-left: -45%;
`;

const MainContainer = () => {

    const [classInfos, setClassInfos] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [viewData, setViewData] = useState({});
    const [clickedOption, setClickedOption] = useState('');

    const userData = useContext(UserContext);
    useEffect(() => {
        fetchUserData(userData.userId)
            .then(data => {
                if ( data ) {
                    setClassInfos(data.data.me.class);
                }
            })
            .catch(err => {console.error(err)})
    }, [userData.userId])

    return (
        <Container>
            <ClassList 
                classInfos={classInfos}
                chooseClass={setClassOptions}
                setViewData={setViewData}
            />
            <OptionList
                classOptions={classOptions}
                setClickedOption={setClickedOption}
            />
            <ViewContainer viewData={viewData} clickedOption={clickedOption}/>
        </Container>
    )
}

export default MainContainer;