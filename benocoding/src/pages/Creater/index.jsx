
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../global/authContext.jsx";
import CreaterClassItem from "./components/createrClassItem.jsx";
import { getUserClassList } from "../../utils/apis/class.js";
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


const Creater = () => {

    const authContext = useContext(AuthContext);

    // state
    const [ classList, setClassList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ pageQuantity, setPageQuantity ] = useState(1);
    const [ pageNum, setPageNum ] = useState(0);

    function handlePageChange(e, value) {
        setPageNum(value-1)
    }

    useEffect(() => {
        // check if authContext is still loading
        if ( !authContext.isLoading ) {
            const { user } = authContext;

            // get user classList
            setIsLoading(true)
            getUserClassList(user.userId, Number(pageNum), 'Creater')
                .then(res => {
                    const { response } = res.getCreaterClassList;
                    if ( response && response.statusCode === 200 ) {
                        const { classList, maxPageNum } = res.getCreaterClassList;
                        setClassList(classList);
                        setPageQuantity(maxPageNum);
                    }
                })
                .catch(err => {
                    
                })
                .finally(() => setIsLoading(false))
        }
    }, [authContext, pageNum]);

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
                            classList.map((class_) => {
                                return (
                                    <CreaterClassItem key={"creater" + class_._id} classData={class_}></CreaterClassItem>
                                )
                            })
                        }
                    </ClassList>
                    { classList.length === 0 ? <SectionTitle style={{color: "FireBrick"}}>You have no classes</SectionTitle> : '' }
                    <Pagination page={pageNum+1} count={pageQuantity} size="large" style={{marginBottom: "20px"}} onChange={handlePageChange}></Pagination>
                </Fragment>
            }
        </Section>
    )

}

export default Creater;