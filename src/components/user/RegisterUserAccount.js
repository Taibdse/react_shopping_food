import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormLabel } from 'react-bootstrap';
import InputGroup from '../common/InputGroup';
import { connect } from 'react-redux';
import { isPhone } from '../../validations/isPhone';
import { isEmail } from '../../validations/isMail';
import { isNotEmpty } from '../../validations/isNotEmpty';
import { addAccount } from '../../redux/actions/userAccountActions';
import store from '../../redux/store';
import Swal from 'sweetalert2';

class RegisterUserAccount extends React.Component {
    static propTypes = {
        addAccount: PropTypes.func.isRequired
    };

    state = {
        errors: {},
        userAccount: { username: '', fullname: '', email: '', address: '', phone: '', password: '', repassword: '' }
    };

    registerUserAccount = (e) => {
        e.preventDefault();
        const errors = this.checkValid();
        if(!isNotEmpty(errors)){
            const { userAccount } = this.state;
            const { accounts } = store.getState().userAccount;
            const index = accounts.findIndex(acc => acc.username === userAccount.username);
            if(index > -1) return Swal.fire({
                position: 'top-end',
                type: 'warning',
                toast: true,
                title: 'Your username has already existed!!',
                showConfirmButton: false,
                timer: 5000
            })

            delete userAccount.repassword;
            this.props.addAccount(userAccount);
            Swal.fire({
                type: 'success',
                title: 'Register successfully!',
                timer: 3000
            });

            setTimeout(() => this.props.history.push('/user'), 3200);
        } else {
            this.setState({ errors });
            Swal.fire({
                position: 'top-end',
                type: 'error',
                toast: true,
                title: 'Invlid input data!!',
                showConfirmButton: false,
                timer: 4000
            })
        }
    }

    onChange = e => {
        let userAccount = Object.assign({}, this.state.userAccount);
        userAccount[e.target.name] = e.target.value;
        this.setState({ userAccount });
    }

    checkValid = () => {
        let { username, fullname, email, address, phone, password, repassword } = this.state.userAccount;
        let errors = {};
        if(!isNotEmpty(username)) errors.username = 'Username is required';
        if(!isNotEmpty(address)) errors.address = 'Address is required';
        if(!isNotEmpty(fullname)) errors.fullname = 'Fullname is required';
        if(!isEmail(email)) errors.email = 'Email must be right format';
        if(!isPhone(phone)) errors.phone = 'Phone must be 9 - 12 digits';
        if(password.trim().length < 4) errors.password = 'Password must be at least 4 characters';
        if(repassword !== password) errors.repassword = 'Password and repassword must be the same';
        return errors;
    }

    resetForm = () => {
        const userAccount = { username: '', fullname: '', email: '', address: '', phone: '', password: '', repassword: '' }
        this.setState({ userAccount });
    }

    render() {
        const { errors, userAccount } = this.state;
        return (
            <div className="container">
                <h2 className="text-center font-italic mt-3">Register free account here</h2>
                <div className="row" style={{ marginBottom: '100px' }}>
                    <div className="col-sm-8 mx-auto mt-5">
                    <div className="card card-body">
                        <form onSubmit={this.registerUserAccount}>
                            <FormGroup>
                                <FormLabel>Username</FormLabel>
                                <InputGroup 
                                    name="username"
                                    placeholder="Enter username..."
                                    onChange={this.onChange}
                                    value={userAccount.username}
                                    error={errors.username}
                                    icon={"fas fa-hamburger"}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Fullname</FormLabel>
                                <InputGroup 
                                    name="fullname"
                                    placeholder="Enter fullname..."
                                    onChange={this.onChange}
                                    value={userAccount.fullname}
                                    error={errors.fullname}
                                    icon={"fas fa-hamburger"}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <InputGroup 
                                    name="email"
                                    placeholder="Enter email..."
                                    onChange={this.onChange}
                                    value={userAccount.email}
                                    error={errors.email}
                                    icon={"fas fa-hamburger"}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Phone</FormLabel>
                                <InputGroup 
                                    type="number"
                                    name="phone"
                                    placeholder="Enter phone..."
                                    onChange={this.onChange}
                                    value={userAccount.phone}
                                    error={errors.phone}
                                    icon={"fas fa-hamburger"}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Address</FormLabel>
                                <InputGroup 
                                    name="address"
                                    placeholder="Enter address..."
                                    onChange={this.onChange}
                                    value={userAccount.address}
                                    error={errors.address}
                                    icon={"fas fa-hamburger"}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <InputGroup 
                                    type="password"
                                    name="password"
                                    placeholder="Enter password..."
                                    onChange={this.onChange}
                                    value={userAccount.password}
                                    error={errors.password}
                                    icon={"fas fa-hamburger"}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Retype password</FormLabel>
                                <InputGroup 
                                    type="password"
                                    name="repassword"
                                    placeholder="Enter repassword..."
                                    onChange={this.onChange}
                                    value={userAccount.repassword}
                                    error={errors.repassword}
                                    icon={"fas fa-hamburger"}
                                />
                            </FormGroup>
                            <button className="btn btn-outline-success float-right" type="submit">Save</button>
                            <button className="btn btn-outline-default float-right" onClick={this.resetForm} type="button">Reset</button>
                        </form>
                    </div>
                </div>
                </div>            
            </div>
        );
    }
}

export default connect(null, { addAccount })(withRouter(RegisterUserAccount));
