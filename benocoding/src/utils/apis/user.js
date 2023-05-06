
import { PRODUCTION_BACKEND_API_URL } from "../../global/constant.js";
import axios from "axios";

async function getUserMilestoneData(userId, classId) {

    const graphqlQuery = {
        query : `
            query($classId: String!, $userId: String!) {
                milestones(classId: $classId, userId: $userId) {
                    response {
                        statusCode,
                        responseMessage
                    },
                    milestones {
                        functionName,
                        functionTemplate,
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
        const { milestones } = data.data;
        return milestones;
    } catch (err) {
        console.error(err);
    }
}

export {
    getUserMilestoneData
}