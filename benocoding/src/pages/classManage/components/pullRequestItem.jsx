
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../global/authContext.jsx";
import { getPullRequestDetail } from "../../../utils/apis/class.js";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Diff2Html } from "diff2html";

const Block = styled.div`
    height: 50px;
    width: 95%;
    border: 1px solid black;
    margin: 10px 0 0 0;
    cursor: pointer;
    
    :hover {
        background-color: bisque;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const BlockTitle = styled.p`
    font-size: 20px;
    padding: 0 20px;
`;

const ContentWrapper = styled.div`
    width: 95%;
    border: 1px solid black;
    height: ${props => props.isShowContent ? '500px' : '0'};
    transition: height 0.3s ease-in-out;
    overflow: scroll;
`;

const ContentContainer = styled.div`
    font-size: 20px;
`;

const ContentTitle = styled.p`
    font-size: 30px;
    padding: 0 20px;
    margin: 0;
`;

const PullRequestItem = ({data, classId}) => {

    const authContext = useContext(AuthContext);

    const [ isShowContent, setIsShowContent ] = useState(false);
    const [ mergeable, setMergeable ] = useState(false);
    const [ diffContent, setDiffContent ] = useState('');

    function showContent(e) {
        e.preventDefault();
        setIsShowContent(!isShowContent);
    }

    useEffect(() => {
        if ( !authContext.isLoading ) {
            const { user } = authContext;
            getPullRequestDetail(user.userId, classId, data.number)
                .then(response => {
                    const { getPRDetail } = response;
                    setMergeable(getPRDetail.mergeable);
                    setDiffContent(getPRDetail.diffData);
                })
                .catch(err => {console.error(err)})
        }
    }, [authContext, classId, data.number])

    return (
        <Block>
            <TitleWrapper onClick={showContent}>
                <MenuOpenIcon sx={{fontSize: "30px", cursor: "pointer"}}></MenuOpenIcon>
                <BlockTitle>#{data.number} | {data.title} | {`( ${data.head} => ${data.base} )`}</BlockTitle>
            </TitleWrapper>
            <ContentWrapper isShowContent={isShowContent}>
                {
                    isShowContent ? <ContentContainer>
                        <ContentTitle>#PR Detail</ContentTitle>
                        <pre>{diffContent}</pre>
                    </ContentContainer> : ''
                }
            </ContentWrapper>
        </Block>
    )
}

export default PullRequestItem;
