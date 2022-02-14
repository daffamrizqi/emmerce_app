import Axios from "axios"
import { API_URL } from "../../constants/Api"

export const registerUser = ({fullName, userName, email, password}) => {
    // dispatch : untuk mengirim action object ke reducers
    return (dispatch) => {
        Axios.post(`${API_URL}/users`, {
            fullName,
            userName,
            email,
            password,
            role: 'user'
        })
        .then((result) => {
            delete result.data.password

            // memunculkan data yang dibuat oleh server (db.json)
            console.log(result.data)
            dispatch({
                type: "USER_LOGIN",
                payload: result.data
            })
            alert("Berhasil menambahkan user")
        })
        .catch(() => {
            alert("Gagal menambahkan user")
        })
    }
}

export const loginUser = ({ userName, password }) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            // field yang memenuhi ketentuan dan akan di return pada result.data
            params: {
                userName
            }
        })
        .then((result) => {
            // result.data berupa array
            if (result.data.length){
                if(password === result.data[0].password){
                    delete result.data[0].password

                    localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]))

                    dispatch({
                        type: "USER_LOGIN",
                        payload: result.data[0]
                    })
                } else {
                    // handle error wrong password
                    dispatch({
                        type: "USER_ERROR",
                        payload: "Wrong password!"
                    })
                }
            } else {
                // handle error username not found
                dispatch({
                    type: "USER_ERROR",
                    payload: `User ${userName} not found!`
                })
            }
        })
        .catch((err) => {
            alert(`Terjadi kesalahan pada server`)
        })
    }
}

export const logoutUser = () => {
    localStorage.removeItem("userDataEmmerce")

    return {
        type: "USER_LOGOUT"
    }
}

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                id: userData.id
            }
        })
        .then((result) => {
            delete result.data[0].password

            localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]))

            dispatch({
                type: "USER_LOGIN",
                payload: result.data[0]
            })
        })
        .catch(err => {
            alert('Terjadi kesalahan di server!')
        })
    }
}

export const checkStorage = () => {
    return {
        type: "CHECK_STORAGE"
    }
}