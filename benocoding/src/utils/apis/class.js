
import { PRODUCTION_BACKEND_API_URL } from "../../global/constant.js";
import axios from "axios";

async function getRandomClasses() {
    const graphqlQuery = {
        query: `
            query {
                getRandomClasses {
                    response {
                        statusCode,
                        responseMessage
                    },
                    classList {
                        id,
                        teacherName,
                        className,
                        classDesc,
                        classImage,
                        classTags,
                        studentNumbers,
                        status
                    }
                }
        }
        `
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
        const { getRandomClasses } = data.data;
        return getRandomClasses;

    } catch (err) {
        console.error(err);
    }
}

async function getClassList(pageNum, keyword) {
    const graphqlQuery = {
        query: `
            query($pageNum: Int!, $keyword: String) {
                getClassList(pageNum: $pageNum, keyword: $keyword) {
                    response {
                        statusCode,
                        responseMessage
                    },
                    classList {
                        id,
                        teacherName,
                        className,
                        classDesc,
                        classImage,
                        classTags,
                        studentNumbers,
                        status
                    },
                    maxPageNum
                }
        }
        `,
        variables: {
            pageNum: pageNum,
            keyword: keyword
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
        const { getClassList } = data.data;
        if ( getClassList.response.statusCode !== 200 ) {
            return getClassList;
        }

        return getClassList;

    } catch (err) {
        console.error(err);
    }
}

async function getUserClassList(userId, pageNum, role) {
    const graphqlQuery = {
        query: `
            query($userId: String!, $pageNum: Int!) {
                get${role}ClassList(userId: $userId, pageNum: $pageNum) {
                    response {
                        statusCode,
                        responseMessage
                    },
                    classList {
                        teacherName,
                        className,
                        classDesc,
                        classStartDate,
                        classImage,
                        _id
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
            url: PRODUCTION_BACKEND_API_URL,
            headers: {
                "Content-Type": "application/json"
            },
            data: graphqlQuery
        })
        console.log(data.data)
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
                    response {
                        statusCode,
                        responseMessage
                    },
                    price,
                    teacherName,
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
                        functionTemplate,
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
            url: PRODUCTION_BACKEND_API_URL,
            headers: {
                "Content-Type": "application/json"
            },
            data: graphqlQuery
        })
        const classData = data.data.class;
        return classData;

    } catch (err) {
        console.error(err);
    }
}

async function getAllPullRequests(userId, classId) {
    const graphqlQuery = {
        query : `
            query($userId: String!, $classId: String!) {
                getAllPullRequests(userId: $userId, classId: $classId) {
                    response {
                        statusCode,
                        responseMessage
                    },
                    data {
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

async function getPullRequestDetail(userId, classId, number) {
    const graphqlQuery = {
        query : `
            query($userId: String!, $classId: String!, $number: Int!) {
                getPRDetail(userId: $userId, classId: $classId, number: $number) {
                    response {
                        statusCode,
                        responseMessage
                    },
                    mergeable,
                    diffData,
                    html_url,
                    state,
                    merge_commit_sha,
                    commits,
                    additions,
                    deletions,
                    body
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

async function updateClassSettings(updateData, classId) {
    const mutation = {
        query: `
            mutation($data: UpdateData!, $classId: String!) {
                updateClass(data: $data, classId: $classId) {
                    response {
                        statusCode,
                        responseMessage
                    }
                }
            }
        `,
        variables: {
            data: updateData,
            classId
        }
    }

    const { data } = await axios({
        method: "POST",
        url: PRODUCTION_BACKEND_API_URL,
        headers: {
            "Content-Type": "application/json",
            "token": window.localStorage.getItem("jwt")
        },
        data: mutation
    })
    console.log(data);
    return data.data;
}

export {
    getClassList,
    getRandomClasses,
    getUserClassList,
    getClassData,
    getAllPullRequests,
    getPullRequestDetail,
    updateClassSettings
};
