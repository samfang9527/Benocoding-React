
import { BACKEND_API_URL } from "../../global/constant.js";
import axios from "axios";

async function fetchOptionData(chooseClass, role, classId, setViewData) {
    chooseClass([]);
    const res = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query getClassOptions($classId: String!) {
                    class(classId: $classId) {
                        teacherOptions,
                        studentOptions,
                        className,
                        classDesc,
                        classStartDate,
                        classEndDate,
                        id,
                        milestones {
                            milestone,
                            milestoneDesc,
                            autoTest,
                            passed
                        },
                        chatroomId,
                        classImage,
                        classVideo,
                        classMembers {
                            userId,
                            username,
                            email
                        }
                    }
                }
            `,
            variables: {
                classId: classId,
            }
        })
    })
    const data = await res.json();
    const { teacherOptions } = data.data.class;
    const { studentOptions } = data.data.class;
    chooseClass(role === 'teacher' ? teacherOptions : studentOptions);
    setViewData(data.data.class);
}

async function getClassList(userId, pageNum, role) {
    const graphqlQuery = {
        query: `
            query($userId: String!, $pageNum: Int!) {
                get${role}ClassList(userId: $userId, pageNum: $pageNum) {
                    id,
                    teacherName,
                    className,
                    classDesc,
                    classStartDate,
                    classEndDate,
                    classImage,
                    classTags,
                    studentNumbers,
                    status,
                    milestones {
                        milestone,
                        milestoneDesc,
                        autoTest,
                        passed
                    },
                    studentOptions,
                    chatroomId,
                    classMembers {
                        username,
                        userId,
                        email
                    }
                }
        }
        `,
        variables: {
            userId: userId,
            pageNum: pageNum
        }
    }
    try {
        const { data } = await axios({
            method: 'POST',
            url: BACKEND_API_URL,
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

async function getPageQuantity(userId, role) {

    const graphqlQuery = {
        query: `
            query($userId: String!) {
                get${role}ClassNums(userId: $userId)
            }
        `,
        variables: {
            userId: userId
        }
    }

    try {
        const { data } = await axios({
            method: 'POST',
            url: BACKEND_API_URL,
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

async function getClassData(classId) {

    const graphqlQuery = {
        query : `
            query ($classId: String!) {
                class(classId: $classId) {
                    teacherOptions,
                    studentOptions,
                    className,
                    classDesc,
                    classStartDate,
                    classEndDate,
                    id,
                    ownerId,
                    milestones {
                        functionName,
                        autoTest,
                        functionTest,
                        milestone,
                        milestoneDesc,
                        passed,
                        testCases {
                          case,
                          inputs,
                          method,
                          result,
                          statusCode
                        }
                    },
                    chatroomId,
                    classImage,
                    classVideo,
                    classMembers {
                        userId,
                        username,
                        email
                    },
                    gitHub {
                        repo,
                        owner,
                        accessToken
                    }
                }
            }
        `,
        variables: {
            classId: classId
        }
    }

    try {
        const { data } = await axios({
            method: 'POST',
            url: BACKEND_API_URL,
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

async function getAllPullRequests(userId, classId) {
    const graphqlQuery = {
        query : `
            query($userId: String!, $classId: String!) {
                getAllPullRequests(userId: $userId, classId: $classId) {
                    url,
                    number,
                    title,
                    body,
                    head,
                    base,
                    created_at,
                    updated_at
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
            url: BACKEND_API_URL,
            headers: {
                "Content-Type": "application/json"
            },
            data: graphqlQuery
        })
        console.log(data);
        return data.data;
    } catch (err) {
        console.error(err);
    }
}

async function getPullRequestDetail(userId, classId, number) {
    const graphqlQuery = {
        query : `
            query($userId: String!, $classId: String!, $number: Int!) {
                getPRDetail(userId: $userId, classId: $classId, number: $number) {
                    mergeable,
                    diffData
                }
            }
        `,
        variables: {
            userId: userId,
            classId: classId,
            number: number
        }
    }

    try {
        const { data } = await axios({
            method: 'POST',
            url: BACKEND_API_URL,
            headers: {
                "Content-Type": "application/json"
            },
            data: graphqlQuery
        })
        console.log(data);
        return data.data;
    } catch (err) {
        console.error(err);
    }
}

export {
    fetchOptionData,
    getClassList,
    getPageQuantity,
    getClassData,
    getAllPullRequests,
    getPullRequestDetail
};
