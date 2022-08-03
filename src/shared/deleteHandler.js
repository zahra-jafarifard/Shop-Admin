import { useSelector } from "react-redux";

export const Delete = () => {
    const token = useSelector(state => state.shop.token);

    const deleteFunction = async (id, api, setStates) => {
        let Data;
        let _response;
        try {
            Data = await fetch(`http://localhost:5000/${api}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            _response = await Data.json();
            if (!Data.ok) {
                return new Error(_response);
            }
            else {
                return setStates(prevStates => prevStates.filter(prevState => prevState.id !== id))
            }
        } catch (error) {
            return new Error(error.message)
        }
    }
    return { deleteFunction };
}