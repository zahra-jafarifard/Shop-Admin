export const graphqlFunction = async (graphqlQuery) => {
    return fetch('http://localhost:5000/graphql', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            return(res.data)

        })
        .catch(err => {
            console.log(err)
        })

}