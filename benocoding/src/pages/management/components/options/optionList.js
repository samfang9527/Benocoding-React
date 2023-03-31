
import styled from "styled-components";
import OptionItem from "./optionItem";

const ClassOptionsContainer = styled.div`
    height: 80%;
    width: 200px;
    text-align: center;
    padding: 0 10px;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;

const Heading = styled.h2`
    height: 34px;
    position: sticky;
    top: 10px;
    background-color: rgba(10, 170, 120, 95%);
    margin: 10px;
    padding: 10px 0;
    border-radius: 10px;
`;

const OptionList = ({classOptions, setClickedOption}) => {
    return (
        <ClassOptionsContainer>
            <Heading>課程選項</Heading>
            {
                classOptions.map((data, index)=> {
                    return <OptionItem 
                    option={data}
                    key={index}
                    setClickedOption={setClickedOption}
                    />
                })
            }
        </ClassOptionsContainer>
    )
}

export default OptionList;