
import { BACKEND_API_URL } from "../../global/constant.js";

async function fetchUserData(userId) {
    try {
        const res = await fetch(BACKEND_API_URL, {
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

export {
    fetchUserData
}