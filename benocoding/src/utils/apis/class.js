
async function fetchOptionData(chooseClass, classId, setViewData) {
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
                        classImage
                    }
                }
            `,
            variables: {
                classId: classId
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
