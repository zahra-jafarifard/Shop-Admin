export const submitFunction = async (api, method, body, setJsonHeader) => {
        let x = {};
        
        if (setJsonHeader) {
            x = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: body
            }
        } else {
            x = {
                method: method,
                body: body
            }
        }
        return fetch(`http://localhost:5000/${api}`, x )
            .then(res => {
                if (!res.ok) {
                    return new Error(res)
                }
                return res.json();
            })
            .catch(err => {
                return new Error(err)
            })
    }