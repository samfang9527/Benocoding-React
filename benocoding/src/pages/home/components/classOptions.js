
import styled from "styled-components";
import OptionItem from "./optionItem";

const ClassOptionsContainer = styled.div`
    height: 80%;
    width: 20%;
    text-align: center;
    padding: 0 10px;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0 10px;
`;

const ClassOptions = ({classOptions}) => {
    return (
        <ClassOptionsContainer>
            <h2>課程選項</h2>
            {
                classOptions.map((data, index)=> {
                    return <OptionItem 
                    option={data}
                    key={index}
                    />
                })
            }
        </ClassOptionsContainer>
    )
}

export default ClassOptions;