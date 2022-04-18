export const Submit = () => {

    const submitFunction = async (api, method, body, setJsonHeader) => {
        let x = 'undefined';
        if (setJsonHeader) {
            x = 'application/json'
        }
        return fetch(`http://localhost:5000/${api}`, {
            method: method,
            headers: { 'Content-Type': x },
            body: body
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