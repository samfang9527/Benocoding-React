
import { PRODUCTION_BACKEND_API_URL } from "../../global/constant.js";
import axios from "axios";

async function fetchUserData(userId) {
    try {
        const res = await fetch(PRODUCTION_BACKEND_API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    query GetMyInfo($meId: String!) {
                        me(id: $meId) {
                            class {
                                classId,
                                className,
                                role
                            }
                        }
                    }
                `,
                variables: {
                    meId: userId
                }
            })
        })
        const data = await res.json();
        if ( data.errors ) {
            return;
        }
        return data;
    } catch (err) {
        console.error(err);
    }
}

async function getUserMilestoneData(userId, classId) {

    const graphqlQuery = {
        query : `
            query($classId: String!, $userId: String!) {
                milestones(classId: $classId, userId: $userId) {
                    functionName,
                    milestone,
                    milestoneDesc,
                    passed,
                    autoTest,
                    functionTest,
                    testCases {
                        case,
                        statusCode,
                        inputs,
                        method,
                        result
                    }
                }
            }
        `,
        variables: {
            userId: userId,
            classId: classId
        }
    }

    try {
        const { data } = await axios({
            method: 'POST',
            url: PRODUCTION_BACKEND_API_URL,
            headers: {
                "Content-Type": "application/json"
            },
            data: graphqlQuery
        })
        return data.data;
    } catch (err) {
        console.error(err);
    }
}

export {
    fetchUserData,
    getUserMilestoneData
}