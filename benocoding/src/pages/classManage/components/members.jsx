
import ViewMemberItem from "./memberItem";

const Members = ({data, classData}) => {

    console.log(data);

    return (
        data.map((member, idx) => {
            return <ViewMemberItem userInfo={member} classData={classData} key={idx + member.userId}/>
        })  
    );

}

export default Members;