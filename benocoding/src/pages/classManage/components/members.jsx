
import MemberItem from "./memberItem";

const Members = ({memberData, classData}) => {

    return (
        memberData.map((member, idx) => {
            return <MemberItem userInfo={member} classData={classData} key={idx + member.userId}/>
        })  
    );

}

export default Members;