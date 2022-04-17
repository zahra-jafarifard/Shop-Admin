export const Delete = () => {

    const deleteFunction = async (id, api, setStates) => {
        console.log(id, setStates, api)
        // setShoWModal(false);
        let Data;
        let _response;
        try {
            Data = await fetch(`http://localhost:5000/${api}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            _response = await Data.json();
            if (!Data.ok) {
                return new Error(_response);
            }
            else {
                return setStates(prevStates => prevStates.filter(prevState => prevState.id != id))
            }
        } catch (error) {
            return new Error(error.message)
        }
    }
    return { deleteFunction };
}