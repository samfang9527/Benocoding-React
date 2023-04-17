
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getClassList } from "../../utils/apis/class.js";
import ClassItem from "./components/classItem.jsx";
import Pagination from "@mui/material/Pagination";
import { DOMAIN } from "../../global/constant.js";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CampaignSection = styled.section`
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 50px;
`;

const InputBlock = styled.div`
    width: 30%;
    height: 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0px -50px 0px 10px;
`;

const SearchDescription = styled.p`
    font-size: 32px;
    flex-grow: 1;
    margin: 0px 20px;
    letter-spacing: 2px;
    font-weight: bold;
`;

const SearchInput = styled.input`
    height: 50px;
    width: 100%;
    font-size: 24px;
    padding: 0 20px;
    border-radius: 25px;
    border: 3px solid FireBrick;
`;

const ClassSection = styled.section`
    width: 85%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0px 50px 50px 50px;
    border-radius: 20px;
    background-color: White;
`;

const CampaignBlock = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid black;
`;

function getPaging(queryString) {
    const params = new URLSearchParams(queryString);
    return params.get('paging');
}

function getKeyword(queryString) {
    const params = new URLSearchParams(queryString);
    return params.get('keyword');
}

const Home = () => {

    const searchInput = useRef(null);
    const location = useLocation();

    const [ classList, setClassList ] = useState([]);
    const [ campaignList, setCampaignList ] = useState([]);
    const [ maxPageNum, setMaxPageNum ] = useState(0);
    const [ pageNum, setPageNum ] = useState(getPaging(location.search));
    const [ keyword, setKeyword ] = useState(getKeyword(location.search));

    function handlePageChange(e, value) {
        const params = new URLSearchParams(window.location.search);
        params.set("paging", value-1);
        const newSearch = params.toString();
        const newUrl = `${DOMAIN}?${newSearch}`
        window.history.pushState(null, '', newUrl);
        setPageNum(value-1);
    }

    function handleSearch(e) {
        if ( e.keyCode === 13 ) {
            const params = new URLSearchParams(window.location.search);
            params.set("keyword", searchInput.current.value);
            const newSearch = params.toString();
            const newUrl = `${DOMAIN}?${newSearch}`
            window.history.pushState(null, '', newUrl);
            setKeyword(searchInput.current.value);
        }
    }

    useEffect(() => {
        getClassList(Number(pageNum), keyword)
            .then(response => {
                const { getClassList } = response;
                const { allPageNums } = response;
                if ( getClassList ) {
                    setClassList(getClassList);
                }

                if ( allPageNums ) {
                    setMaxPageNum(allPageNums);
                }
            })
            .catch(err => {console.error(err)})

    }, [pageNum, keyword])

    useEffect(() => {
        // campaign list

    }, [])

    return (
        <MainContainer>
            <CampaignSection>
                <InputBlock>
                    <SearchDescription>Find a class</SearchDescription>
                    <SearchInput type="text" placeholder="Javascript" ref={searchInput} onKeyUp={handleSearch}></SearchInput>
                </InputBlock>
                <CampaignBlock></CampaignBlock>
            </CampaignSection>
            <Pagination
                count={maxPageNum}
                size="large"
                style={{marginTop: "40px"}}
                onChange={handlePageChange}>
            </Pagination>
            <ClassSection>
                {
                    classList.map((class_, idx) => {
                        return (
                            <ClassItem key={class_.id} class_={class_}></ClassItem>
                        )
                    })
                }
            </ClassSection>
        </MainContainer>
    )
}

export default Home;