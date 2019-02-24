import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isUser } from '../../auth/isUser';
import { setUser, toggleFormLoginUser } from '../../redux/actions/userActions';

class LoginUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        };
    }

    login = (e) => {
        e.preventDefault();
        let { username, password } = this.state.user;
        if(isUser(username, password)){
          this.props.setUser(this.state.user);
          this.handleClose();
        } else {
            this.props.setUser({});
            alert('Username and password do not match!');
        }
    }

    resetForm = (e) => {
        e.preventDefault();
        this.setState({ user: { username: '', password: '' } });
    }

    onChange = (e) => {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        this.setState({ user });
    }

    handleClose = () => this.props.toggleFormLoginUser(false);

    render() {
        return (
            <Modal show={this.props.showFormUserLogin} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Login Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.login}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" onChange={this.onChange} placeholder="Enter username..." value={this.state.user.username}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Enter password..." value={this.state.user.password}/>
                        </div>
                        <button className="btn btn-success float-right ml-2">Login</button>
                        <button className="btn btn-primary float-right" onClick={this.resetForm}>Reset</button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

LoginUser.propTypes = {
    showFormUserLogin: PropTypes.bool.isRequired,
    setUser: PropTypes.func.isRequired,
    toggleFormLoginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    showFormUserLogin: state.user.showFormUserLogin,
})

export default connect(mapStateToProps, { toggleFormLoginUser, setUser, toggleFormLoginUser })(LoginUser);
