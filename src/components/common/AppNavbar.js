import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter }  from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { setAdmin } from '../../redux/actions/adminActions';
import { setUser, toggleFormLoginUser } from '../../redux/actions/userAccountActions';
import { setUserForCart } from '../../redux/actions/cartActions';
import classnames from 'classnames';

class AppNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAboutPage: false,
            isAdminPage: false,
            isUserPage: false,
            isLoginAdminPage: false,
            isAdminRoute: false
        };

        this.props.history.listen((location) => {
            this.setNavLinkActive(location);
            this.setState({ isAdminRoute: this.isAdminRoute() });
        })
    }

    setNavLinkActive = (location) => {
        let { pathname } = location;
        this.setState({ 
            isAdminPage: pathname.indexOf('/admin') > -1, 
            isAboutPage: pathname === '/about', 
            isUserPage: pathname === '/',
            isLoginAdminPage: pathname === '/login'
        });
    }

    componentDidMount = () => {
        this.setNavLinkActive(this.props.location);
        this.setState({ isAdminRoute: this.isAdminRoute() });
    }

    shouldRenderLogOutBtn = () => {
        return this.props.auth.isAuthenticated && this.state.isAdminRoute;
    }

    logout = () => {
        this.props.setAdmin({});
        this.props.history.push('/login');
    }

    logoutUser = () => {
        this.props.setUser({});
        this.props.setUserForCart('');
    }

    signInUser = () => {
        if(!this.props.user.isAuthenticated){
            this.props.toggleFormLoginUser(true);
        }
    }

    isAdminRoute = () => this.props.location.pathname.indexOf('/admin') > -1;

    render() {
        let { isAdminPage, isAboutPage, isUserPage, isLoginAdminPage, isAdminRoute } = this.state;
        let { user } = this.props;

        let userNavBar = (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">DTFood.vn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className={ classnames('nav-link', { 'active': isUserPage }) } to="/">Home</Link>
                        <Link className={ classnames('nav-link', { 'active': isAboutPage }) } to="/about">About</Link>
                    </Nav>
                   
                    <Form inline>
                        { user.isAuthenticated && (
                            <span>
                                <Link className="font-italic mr-3" to="/user/account">{ user.curAccount.username }</Link>
                                <Button variant="outline-danger mr-3" onClick={this.logoutUser}>Logout</Button>
                                <Link className="btn btn-outline-info" to="/user_orders">
                                    <i className="fas fa-shopping-cart mr-2"></i> Your orders
                                </Link>
                            </span>
                        ) } 
                        {( !user.isAuthenticated &&
                            <Button variant="outline-warning" onClick={this.signInUser}>Sign In User Account</Button>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )

        let adminNavbar = (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">DTFood.vn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className={ classnames('nav-link', { 'active': isAdminPage }) } to="/admin">Home</Link>
                        <Link className={ classnames('nav-link', { 'active': isAdminPage }) } to="/admin/users_manage">User Accounts</Link>
                        <Link className={ classnames('nav-link', { 'active': isAboutPage }) } to="/about">About</Link>
                    </Nav>
                   
                    <Form inline>
                        { this.shouldRenderLogOutBtn() && <Button variant="outline-info" onClick={this.logout}>Logout</Button> }
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

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    setAdmin: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    toggleFormLoginUser: PropTypes.func.isRequired,
    setUserForCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.admin,
    user: state.userAccount
})

export default connect(mapStateToProps, { setAdmin, setUser, toggleFormLoginUser, setUserForCart })( withRouter(AppNavbar) );
