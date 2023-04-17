
import styled from "styled-components";
import { CDN_DOMAIN } from "../../../global/constant.js";

const ItemContainer = styled.div`
    width: 400px;
    height: 600px;
    margin: 50px 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    background-color: snow;
`;

const ItemImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ClassTitle = styled.p`
    font-size: 22px;
    padding: 10px 20px;
    margin: 0;
    height: 100px;
    overflow: scroll;
`;

const ClassDesc = styled.p`
    font-size: 18px;
    padding: 10px 20px;
    margin: 0;
    height: 150px;
    overflow: hidden;
`;

const TagsContainer = styled.div`
    padding: 0 20px;
    position: relative;
    top: 150px;
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

    const {
        id,
        classImage,
        className,
        classDesc,
        classTags
    } = class_;

    return (
        <ItemContainer>
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
