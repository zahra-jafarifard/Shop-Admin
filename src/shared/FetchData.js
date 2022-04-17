export const fetchDataFunction = async (api) => {
    return fetch(`http://localhost:5000/${api}`)
        .then(res => {
            if (!res.ok) {
                return new Error(res.message)
            }
            return res.json()
        })
        .then(data => {
            return (data.fetchData)
        })
        .catch(err => {
            console.log(err)
        });
}