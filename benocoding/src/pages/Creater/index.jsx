
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../global/authContext.jsx";
import CreaterClassItem from "./components/createrClassItem.jsx";
import { getUserClassList, getPageQuantity } from "../../utils/apis/class.js";
import { MoonLoader } from "react-spinners";
import { Fragment } from "react";
import Pagination from "@mui/material/Pagination";

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

const CustomLoader = styled(MoonLoader)`
    margin: 50px 0 0 0;
`;

function getPaging(location) {
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    return params.get('paging');
}

function setQueryString(location, value) {
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    params.set('paging', value);
    window.location.search = params;
}

const Creater = () => {

    const location = useLocation();
    const authContext = useContext(AuthContext);

    // state
    const [ classList, setClassList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ pageQuantity, setPageQuantity ] = useState(1);

    function handlePageChange(e, value) {
        setQueryString(location, value-1);
    }

    useEffect(() => {
        // check if authContext is still loading
        if ( !authContext.isLoading ) {
            const { user } = authContext;

            // get user classList
            setIsLoading(true)
            let pageNum = getPaging(location);
            if ( !pageNum || pageNum === '' ) {
                pageNum = 0;
            }
            getUserClassList(user.userId, Number(pageNum), 'Creater')
                .then(res => {
                    console.log(res);
                    const { response } = res.getCreaterClassList;
                    if ( response && response.statusCode === 200 ) {
                        const { classList } = res.getCreaterClassList;
                        setClassList(classList);
                    }
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => setIsLoading(false))
        }
    }, [authContext, location]);

    useEffect(() => {
        if ( !authContext.isLoading ) {
            const { user } = authContext;

            getPageQuantity(user.userId, 'Creater')
                .then(res => {
                    const { response } = res.getCreaterClassNums;
                    if ( response && response.statusCode === 200 ) {
                        const { number } = res.getCreaterClassNums;
                        setPageQuantity(number);
                    }
                })
                .catch(err => console.error(err))
        }
    }, [authContext])

    return (
        <Section>
            <SectionTitle>Hi! {authContext.user.username}</SectionTitle>
            <SectionTitle style={{padding: "0", marginTop: "-10px"}}>Welcome to your creater lobby</SectionTitle>
            <SeperateLine></SeperateLine>
            {
                isLoading ? <CustomLoader color="Crimson" size={100}></CustomLoader> :
                <Fragment>
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
                    <Pagination count={pageQuantity} size="large" style={{marginBottom: "20px"}} onChange={handlePageChange}></Pagination>
                </Fragment>
            }
        </Section>
    )

}

export default Creater;