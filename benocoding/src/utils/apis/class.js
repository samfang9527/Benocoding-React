
import { BACKEND_API_URL } from "../../global/constant.js";

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

export {
    fetchOptionData
};
