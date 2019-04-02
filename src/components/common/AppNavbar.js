import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter }  from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { setAdmin } from '../../redux/actions/adminActions';
import { setUser, toggleFormLoginUser } from '../../redux/actions/userAccountActions';
import { setUserForCart } from '../../redux/actions/cartActions';
import classnames from 'classnames';
import Swal from 'sweetalert2';

class AppNavbar extends React.Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        setAdmin: PropTypes.func.isRequired,
        setUser: PropTypes.func.isRequired,
        toggleFormLoginUser: PropTypes.func.isRequired,
        setUserForCart: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            isAdminRoute: false,
            isAdminHomePage: false,
            isAdminAboutPage: false,
            isAdminUserAccountPage: false,
            isUserHomePage: true
        };

        this.props.history.listen((location) => {
            this.setNavLinkActive(location);
        })
    }

    setNavLinkActive = (location) => {
        let { pathname } = location;
        this.setState({ 
            isAdminRoute: pathname.indexOf('/admin') > -1,
            isAdminHomePage: pathname === '/admin',
            isAdminUserAccountPage: pathname.indexOf('/admin/users_manage') > -1,
            isAdminAboutPage: pathname.indexOf('/admin/about') > -1, 

            isUserHomePage: pathname === '/user'
        });
    }

    componentDidMount = () => {
        this.setNavLinkActive(this.props.location);
    }

    shouldRenderLogOutBtn = () => {
        return this.props.auth.isAuthenticated && this.state.isAdminRoute;
    }

    logoutAdmin = async () => {
        const result = await Swal.fire({
            title: 'Are you sure to log out this app?',
            // text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        })
        if(result.value){
            this.props.setAdmin({});
            this.props.history.push('/admin/login');
        }
    }

    logoutUser = async () => {
        const result = await Swal.fire({
            title: 'Are you sure to log out this app?',
            // text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        })
        if(result.value){
            this.props.setUser({});
            this.props.setUserForCart('');
        }
    }

    signInUser = () => {
        if(!this.props.user.isAuthenticated){
            this.props.toggleFormLoginUser(true);
        }
    }


    render() {
        let { isAdminAboutPage, isAdminHomePage, isAdminUserAccountPage, isAdminRoute, isUserHomePage } = this.state;
        let { user, auth } = this.props;

        let userNavBar = (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/user">DTFood.vn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className={ classnames('nav-link', { 'active': isUserHomePage }) } to="/user">Home</Link>
                    </Nav>
                   
                    <Form inline>
                        { user.isAuthenticated && (
                            <span>
                                <Link className="font-italic mr-3" to="/user/account">{ user.curAccount.username }</Link>
                                <Button variant="outline-danger mr-3" onClick={this.logoutUser}>Logout</Button>
                                <Link className="btn btn-outline-info" to="/user/user_orders">
                                    <i className="fas fa-shopping-cart mr-2"></i> Your orders
                                </Link>
                            </span>
                        ) } 
                        {!user.isAuthenticated && (
                            <React.Fragment>
                                <Button variant="outline-warning" onClick={this.signInUser} className="mr-2">Sign In</Button>
                                <Link to="/user/register_account" className="btn btn-outline-info" >Register account</Link>
                            </React.Fragment>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )

        let adminNavbar = (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/admin">DTFood.vn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        { auth.isAuthenticated && (
                            <React.Fragment>
                                <Link className={ classnames('nav-link', { 'active': isAdminHomePage }) } to="/admin">Foods</Link>
                                <Link className={ classnames('nav-link', { 'active': isAdminUserAccountPage }) } to="/admin/users_manage">User Accounts</Link>
                            </React.Fragment>
                        ) }
                        <Link className={ classnames('nav-link', { 'active': isAdminAboutPage }) } to="/admin/about">About</Link>
                    </Nav>
                   
                    <Form inline>
                        { auth.isAuthenticated && <Button variant="outline-info" onClick={this.logoutAdmin}>Logout</Button> }
                        { !auth.isAuthenticated && <Link to="/admin/login" className="btn btn-outline-info">Log in</Link> }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )

        return (
            <React.Fragment>
                { isAdminRoute ? adminNavbar : userNavBar }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.admin,
    user: state.userAccount
})

export default connect(mapStateToProps, { setAdmin, setUser, toggleFormLoginUser, setUserForCart })( withRouter(AppNavbar) );
