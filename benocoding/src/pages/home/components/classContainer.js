
import styled from "styled-components";
import ClassList from "./classList";
import ClassOptions from "./classOptions";
import OptionView from "./optionView";
import { useEffect, useState } from "react";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

async function fetchUserData(setClassInfos) {
    const res = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query GetMyInfo($meId: String!) {
                    me(id: $meId) {
                        class {
                            classId,
                            className
                        }
                    }
                }
            `,
            variables: {
                meId: '64268831f4e06c2967eb55b5'
            }
        })
    })
    const data = await res.json();
    
    const { me } = data.data;
    setClassInfos(me.class);
}



const ClassContainer = () => {

    const [classInfos, setClassInfos] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [viewData, setViewData] = useState({});

    useEffect(() => {
        fetchUserData(setClassInfos)
    }, [])

    return (
        <Container>
            <ClassList classInfos={classInfos} chooseClass={setClassOptions}/>
            <ClassOptions classOptions={classOptions}/>
            <OptionView viewData={viewData}/>
        </Container>
    )
}

export default ClassContainer;