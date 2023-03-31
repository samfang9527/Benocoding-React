
async function fetchUserData(setClassInfos) {
    const res = await fetch('http://localhost:8080/graphql', {
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
                            className
                        }
                    }
                }
            `,
            variables: {
                meId: '64268831f4e06c2967eb55b5'
            }
        })
    })
    const data = await res.json();
    
    const { me } = data.data;
    setClassInfos(me.class);
}

export {
    fetchUserData
}