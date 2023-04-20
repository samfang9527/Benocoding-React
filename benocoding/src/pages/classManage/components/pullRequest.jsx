
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { getAllPullRequests } from "../../../utils/apis/class.js";
import { AuthContext } from "../../../global/authContext.jsx";
import PullRequestItem from "./pullRequestItem.jsx";
import { MoonLoader } from "react-spinners";

const PRWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
`;

const CustomLoader = styled(MoonLoader)`
    margin: 50px 0 0 0;
`;

const PullRequest = ({classData}) => {

    const authContext = useContext(AuthContext);

    const [ pullRequestData, setPullRequestData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    console.log(classData);

    useEffect(() => {
        
        if ( !authContext.isLoading ) {
            const { user } = authContext;
            setIsLoading(true);
            getAllPullRequests(user.userId, classData.id)
                .then((res) => {
                    const { response } = res.getAllPullRequests;
                    if ( response && response.statusCode === 200 ) {
                        const { data } = res.getAllPullRequests;
                        setPullRequestData(data);
                    }
                    
                })
                .catch(err => {console.error(err)})
                .finally(() => {setIsLoading(false);})
        }
        
    }, [authContext, classData.id])


    return (
        <PRWrapper>
            { isLoading ? <CustomLoader color="crimson" size={100}></CustomLoader> : 
                <>
                {
                    pullRequestData.map((data, idx) => {
                        return (
                            <PullRequestItem key={data.created_at} data={data} classId={classData.id}>OK</PullRequestItem>
                        )
                    })
                }
                </>
            }
        </PRWrapper>
    )
}

export default PullRequest;
