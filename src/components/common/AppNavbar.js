import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter }  from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { setAdmin } from '../../redux/actions/adminActions';
import classnames from 'classnames';

class AppNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAboutPage: false,
            isAdminPage: false,
            isUserPage: false
        };

        this.props.history.listen((location) => this.setNavLinkActive(location))
    }

    setNavLinkActive = (location) => {
        let { pathname } = location;
            this.setState({ 
                isAdminPage: pathname === '/admin', 
                isAboutPage: pathname === '/about', 
                isUserPage: pathname === '/'
            });
    }

    componentDidMount = () => this.setNavLinkActive(this.props.location);

    shouldRenderLogOutBtn = () => {
        return this.props.auth.isAuthenticated && this.props.location.pathname === '/admin';
    }

    logout = () => {
        this.props.setAdmin({});
        this.props.history.push('/login');
    }

    render() {
        let { isAdminPage, isAboutPage, isUserPage } = this.state;
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">DTFood.vn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className={ classnames('nav-link', { 'active': isUserPage }) } to="/">Home</Link>
                        <Link className={ classnames('nav-link', { 'active': isAdminPage }) } to="/admin">Admin</Link>
                        <Link className={ classnames('nav-link', { 'active': isAboutPage }) } to="/about">About</Link>
                    </Nav>
                   
                    <Form inline>
                        { this.shouldRenderLogOutBtn() && <Button variant="outline-info" onClick={this.logout}>Logout</Button> }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    setAdmin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.admin
})

export default connect(mapStateToProps, { setAdmin })( withRouter(AppNavbar) );
