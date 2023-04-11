
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../global/authContext.jsx";
import CreaterClassItem from "./components/createrClassItem.jsx";
import { getClassList } from "../../utils/apis/class.js";

const Section = styled.section`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 30px 0 30px -40%;
    align-items: center;
    position: relative;
    left: 50%;
`;

const SectionTitle = styled.h1`
    padding: 20px 0;
    font-size: 40px;
    letter-spacing: 2px;
`;

const ClassList = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
`;

const SeperateLine = styled.hr`
    width: 80%;
    border: 3px solid Chocolate;
    border-radius: 5px;
`;

function getPaging(location) {
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    return params.get('paging');
}

const Creater = () => {

    const location = useLocation();
    const authContext = useContext(AuthContext);

    // state
    const [ classList, setClassList ] = useState([]);

    useEffect(() => {
        // check if authContext is still loading
        if ( !authContext.isLoading ) {
            const { user } = authContext;

            // get user classList
            ( async () => {
                let pageNum = getPaging(location);
                if ( !pageNum || pageNum === '' ) {
                    pageNum = 0;
                }
                const response = await getClassList(user.userId, Number(pageNum), 'Creater');
                setClassList(response.getCreaterClassList);
            })();
        }
    }, [authContext, location]);



    return (
        <Section>
            <SectionTitle>Hi! {authContext.user.username}</SectionTitle>
            <SectionTitle style={{padding: "0", marginTop: "-10px"}}>Welcome to your creater lobby</SectionTitle>
            <SeperateLine></SeperateLine>
            <ClassList>
                {
                    classList.map((class_, idx) => {
                        return (
                            <CreaterClassItem key={class_.id} classData={class_}></CreaterClassItem>
                        )
                    })
                }
            </ClassList>
            { classList.length === 0 ? <SectionTitle style={{color: "FireBrick"}}>You have no classes</SectionTitle> : '' }
        </Section>
    )

}

export default Creater;