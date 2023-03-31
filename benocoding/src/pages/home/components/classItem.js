
import styled from "styled-components";

const ClassButton = styled.button`
    width: 100%;
    height: 40px;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 6px;
    display: block;
    margin: 10px 0;
    position: relative;
    font-size: 18px;
    font-weight: 550;
    letter-spacing: 2px;
    cursor: pointer;
    &:hover {
        background-color: green;
    }
`;

async function fetchOptionData(chooseClass, classId) {
    chooseClass([]);
    const res = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query getClassOptions($classId: String!) {
                    class(classId: $classId) {
                        classTeacherOptions
                    }
                }
            `,
            variables: {
                classId: classId
            }
        })
    })
    const data = await res.json();
    const { classTeacherOptions } = data.data.class;
    chooseClass(classTeacherOptions)
}

const ClassItem = ({className, classId, chooseClass}) => {

    function showOptions() {
        fetchOptionData(chooseClass, classId)
    }

    return (
        <ClassButton onClick={showOptions}>
            {className}
        </ClassButton>
    )
}

export default ClassItem;