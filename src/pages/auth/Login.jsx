import React from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from '../../redux/actions/user'
import { connect } from "react-redux";

class Login extends React.Component {
    
    state = {
        userName: "",
        password: ""
    }

    inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    render () {
        // check setelah log in maka akan ke redirect ke home page
        if (this.props.userGlobal.id){
            return <Navigate to="/" />
        }
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Log in now!</h1>
                        <p className="lead">
                            Log in now and start shopping in the most affordable ecommerce platform
                        </p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4 offset-4">
                        {
                            this.props.userGlobal.errMsg ? 
                            <div className="alert alert-danger"> {this.props.userGlobal.errMsg}</div>
                            : null
                        }
                        <div className="card">
                            <div className="card-only">
                                <h5 className="font-weight-bold mb-3">Log In</h5>
                                <input onChange={this.inputHandler} type="text" placeholder="Username" name="userName" className="form-control my-2"/>
                                <input onChange={this.inputHandler} type="password" placeholder="Password" name="password" className="form-control my-2"/>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <button onClick={() => this.props.loginUser(this.state)} className="btn btn-primary mt-2">
                                        Login
                                    </button>
                                    <Link to="/register">Or Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user
    };
}

const mapDispatchToProps = {
    loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)