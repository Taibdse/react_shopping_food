import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isAdmin } from '../../auth/isAdmin';
import { setAdmin } from '../../redux/actions/adminActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        };
    }

    componentWillReceiveProps = nextProps => console.log(nextProps.admin);

    login = (e) => {
        e.preventDefault();
        let { username, password } = this.state.user;
        let admin = isAdmin(username, password);
        if(admin) {
            this.props.setAdmin({ username, password });
            this.props.history.push('/admin');
        }
        else return alert('Username and password do not match!!');
    }

    onChange = (e) => {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        this.setState({ user });
    }

    resetForm = (e) => {
        e.preventDefault()
        this.setState({ user: {username: '', password: '' }});
    }

    render() {
        return (
           <div className="container">
                <h3 className="font-italic text-center mt-3">Admin Login</h3>
               <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <div className="card card-body mt-5">
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    admin: PropTypes.object.isRequired,
    setAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    admin: state.admin.admin
})

export default connect(mapStateToProps, { setAdmin })(withRouter(Login));
