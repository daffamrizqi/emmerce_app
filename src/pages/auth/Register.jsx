import React from "react";
import { Link } from "react-router-dom"
import Axios from "axios"
import { API_URL } from "../../constants/Api"
import { registerUser } from "../../redux/actions/user"
import { connect } from "react-redux"

class Register extends React.Component {
    state = {
        fullName: "",
        userName: "",
        email: "",
        password: ""
    }

    // function untuk mengambil setiap text inputan user (register form)
    inputHandler = (event) => {
        // variable input user (function akan mengambil value setiap onChange di trigger)
        const value = event.target.value
        // variable untuk menampung name element (function akan mengambil name setiap onChange di trigger)
        const name = event.target.name

        // mengubah state setiap field
        // menggunakan kurung siku agar datanya bisa dinamis sesuai property name
        // [name] refer kepada variable name diatas
        this.setState({ [name]: value })
    }

    // function button register
    // Axios.post(url, field_obj) = untuk menambahkan data pada db.json
    registerHandler = () => {
        const {fullName, userName, email, password} = this.state;
        Axios.post(`${API_URL}/users`, {
            fullName,
            userName,
            email,
            password,
            role: 'user'
        })
        .then(() => {
            alert("Berhasil menambahkan user")
        })
        .catch(() => {
            alert("Gagal menambahkan user")
        })
    }



    render () {
        return (
            <div className="container" >
                <div className="row" >
                    <div className="col-12 text-center">
                        <h1>Register Now!</h1>
                        <p className="lead">
                            Register now and start shopping in the most affordable ecommerce online platform
                        </p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4 offset-4">
                        <div className="card">
                            <div className="card-only" >
                                <h5 className="font-weight-bold mb-3">Register</h5>
                                <input name="fullName" onChange={this.inputHandler} type="text" placeholder="Full Name" className="form-control my-2" />
                                <input name="userName" onChange={this.inputHandler} type="text" placeholder="Username" className="form-control my-2" />
                                <input name="email" onChange={this.inputHandler} type="text" placeholder="Email" className="form-control my-2" />
                                <input name="password" onChange={this.inputHandler} type="Password" placeholder="Password" className="form-control my-2" />
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <button onClick={() => this.props.registerUser(this.state)} className="btn btn-primary mt-2">
                                        Register
                                    </button>
                                    <Link to="/login">Or Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
    registerUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)