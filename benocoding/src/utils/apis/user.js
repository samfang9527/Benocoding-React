
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
                meId: '642bfa7de0cb3322463c877c'
            }
        })
    })
    const data = await res.json();
    console.log(data);
    
    const { me } = data.data;
    if ( !me ) {
        setClassInfos([]);
        return;
    }
    setClassInfos(me.class);
}

export {
    fetchUserData
}