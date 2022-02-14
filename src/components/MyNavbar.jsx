import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownItem, DropdownMenu } from 'reactstrap'
import { Link } from 'react-router-dom'
import "../assets/styles/MyNavbar.css"
import { connect } from 'react-redux'
import { logoutUser } from "../redux/actions/user" 

class MyNavbar extends React.Component {
    render () {
        return (
            <div>
                <Navbar color="light" light>
                    <NavbarBrand>GuitarBreeze</NavbarBrand>
                    <Nav>
                        {
                            this.props.userGlobal.userName ?
                            <>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret >
                                    Pages
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to="/cart">Cart</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/history">History</Link>
                                    </DropdownItem>
                                    {
                                        this.props.userGlobal.role === 'admin' ? 
                                        <DropdownItem>
                                            <Link to="/admin">Admin</Link>
                                        </DropdownItem>
                                        : null
                                    }
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.props.logoutUser} >
                                        Log out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavbarText>Hello, {this.props.userGlobal.userName}!</NavbarText>
                            </NavItem>
                            </>
                            :
                            <NavItem>
                                <NavbarText>
                                    <Link to="/login" >Login</Link> | <Link to="/register" >Register</Link>
                                </NavbarText>
                            </NavItem>
                        }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user
    }
}

const mapDispatchToProps = {
    logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)