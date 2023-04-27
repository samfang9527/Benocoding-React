
import styled from "styled-components";
import { CDN_DOMAIN } from "../../../global/constant.js";
import { useNavigate } from "react-router";

const ItemContainer = styled.div`
    width: 400px;
    height: 400px;
    margin: 40px 20px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    background-color: snow;
    cursor: pointer;

    :hover {
        background-color: Linen;
    }
`;

const ItemImage = styled.img`
    width: 100%;
    height: 30%;
    object-fit: cover;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: 65%;
`;

const ClassTitle = styled.p`
    font-size: 22px;
    padding: 10px 20px;
    margin: 5px;
    overflow: hidden;
    font-weight: 900;
    color: olivedrab;
`;

const ClassDesc = styled.pre`
    font-size: 18px;
    padding: 0px 20px;
    margin: 5px;
    height: 70%;
    overflow: scroll;
    white-space: pre-wrap;
`;

const TagsContainer = styled.div`
    padding: 0 20px;
`;

const ClassTag = styled.div`
    font-size: 16px;
    border-radius: 25px;
    background-color: Orange;
    color: white;
    width: fit-content;
    padding: 7px;
`;

const ClassItem = ({class_}) => {

    const navigate = useNavigate();

    const {
        id,
        classImage,
        className,
        classDesc,
        classTags
    } = class_;

    return (
        <ItemContainer onClick={() => {navigate(`/class/${id}`)}}>
            <ItemImage src={`${CDN_DOMAIN + classImage}`}></ItemImage>
            <ContentWrapper>
                <ClassTitle>{className}</ClassTitle>
                <ClassDesc>{classDesc}</ClassDesc>
                <TagsContainer>
                    {
                        classTags.map((tag, idx) => {
                            return <ClassTag key={id + tag}>{tag}</ClassTag>
                        })
                    }
                </TagsContainer>
            </ContentWrapper>
        </ItemContainer>
    )
}

export default ClassItem;
