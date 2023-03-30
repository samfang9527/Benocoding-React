
import styled from "styled-components";
import { useState, useEffect } from "react";

const MainWrapper = styled.div`
    height: 80vh;
`;

async function fetchData(setData) {
    const res = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query ($meId: String!) {
                        me(id: $meId) {
                            email
                            password
                    }
                }
            `,
            variables: {
                "meId": "6424efae7c23960062317c3b"
            }
        })
    })
    const data = await res.json();
    const { me } = data.data;
    setData({...me})
}

const Main = () => {

    const [data, setData] = useState({});
    
    useEffect(() => {
        fetchData(setData)
        // setData("ewee")
        console.log(data)
    }, [])

    return (
        <MainWrapper>
            {console.log(data)}
            {/* <p>{data}</p> */}
            {/* Container */}
            {/* Class list */}
            {/* Class options */}
            {/* Option views */}
        </MainWrapper>
    )
}

export default Main;