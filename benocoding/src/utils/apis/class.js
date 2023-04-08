
async function fetchOptionData(chooseClass, userId, userClassId, setViewData) {
    chooseClass([]);
    const res = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query getClassOptions($userClassId: String!, $userId: String!) {
                    class(userClassId: $userClassId, userId: $userId) {
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
                userClassId: userClassId,
                userId: userId
            }
        })
    })
    const data = await res.json();
    console.log(data);
    const { teacherOptions } = data.data.class;
    chooseClass(teacherOptions);
    setViewData(data.data.class);
}

export {
    fetchOptionData
};
