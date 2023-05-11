
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { getAllPullRequests } from "../../../utils/apis/class.js";
import { AuthContext } from "../../../global/authContext.jsx";
import PullRequestItem from "./pullRequestItem.jsx";
import { BarLoader } from "react-spinners";

const PRWrapper = styled.div`
    align-items: center;
    margin: 40px 0;
    min-height: 85vh;
`;

const CustomLoader = styled(BarLoader)`
`;

const PRItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoadingInfo = styled.span`
    text-align: center;
    font-size: 32px;
`;

const LoadingBlock = styled.div`
    position: relative;
    top: 10px;
    left: 50%;
    width: 500px;
    margin-left: -250px;
`;

const NoPRInfo = styled.div`
    width: 100%;
    text-align: center;
    position: relative;
    align-self: center;
    top: 30%;
    left: 0;
    font-size: 40px;
    letter-spacing: 2px;
    line-height: 2;
`;

const PullRequest = ({classData}) => {

    const authContext = useContext(AuthContext);

    const [ pullRequestData, setPullRequestData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

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
                .catch(err => {})
                .finally(() => {setIsLoading(false);})
        }
        
    }, [authContext, classData.id])


    return (
        <PRWrapper>
            { isLoading ? 
                <LoadingBlock>
                    <LoadingInfo>Fetching pull requests data...</LoadingInfo>
                    <CustomLoader color="NavajoWhite" height={10} width={400}></CustomLoader>
                </LoadingBlock> : 
                <PRItemWrapper>
                    {
                        pullRequestData.length === 0 ? <NoPRInfo>Congratulations! <br /> no pull requests here</NoPRInfo> : ""
                    }
                    {
                        pullRequestData.map((data, idx) => {
                            return (
                                <PullRequestItem key={data.created_at} data={data} classId={classData.id}>OK</PullRequestItem>
                            )
                        })
                    }
                </PRItemWrapper>
            }
        </PRWrapper>
    )
}

export default PullRequest;
