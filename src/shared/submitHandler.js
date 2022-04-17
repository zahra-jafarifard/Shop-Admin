export const Submit = () => {

    const submitFunction = async (api, method, body) => {
        return fetch(`http://localhost:5000/${api}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (!res.ok) {
                    return new Error(res.message)
                }
                return res.json();
            })
            .catch(err => {
                return new Error(err)
            })
    }
    return { submitFunction };
}