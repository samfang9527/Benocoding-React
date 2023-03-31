
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
                        classTeacherOptions,
                        className,
                        classDesc,
                        classStartDate,
                        classEndDate,
                        maxStudentsNumber,
                        minStudentsNumber,
                        _id,
                        classMilestones {
                          milestone,
                          milestoneDesc,
                          milestoneAutoTestCode,
                          passed
                        },
                        teacherList
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
    const { classTeacherOptions } = data.data.class;
    chooseClass(classTeacherOptions);
    setViewData(data.data.class);
}

export {
    fetchOptionData
};
