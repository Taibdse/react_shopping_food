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
import classnames from 'classnames';

class RegisterUserAccount extends React.Component {
    static propTypes = {
        addAccount: PropTypes.func.isRequired
    };

    state = {
        submitted: false,
        inputPasswordType: 'password',
        inputRePasswordType: 'password',
        errors: {},
        userAccount: { username: '', fullname: '', email: '', address: '', phone: '', password: '', repassword: '' }
    };

    

    showToastMsg = (title, type, timer) => Swal.fire({
        position: 'top-end',
        type, title, timer,
        toast: true,
        showConfirmButton: false,
    })

    registerUserAccount = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });

        const errors = this.checkValid();
        if(!isNotEmpty(errors)){
            const { userAccount } = this.state;
            const { accounts } = store.getState().userAccount;
            const index = accounts.findIndex(acc => acc.username === userAccount.username);
            if(index > -1) return this.showToastMsg('Your username has already existed!!', 'warning', 5000);

            delete userAccount.repassword;
            this.props.addAccount(userAccount);
            this.showToastMsg('Registered successfully!', 'success', 3000);
            setTimeout(() => this.props.history.push('/user'), 3200);
        } else {
            this.setState({ errors });
            this.showToastMsg('Invlid input data!!', 'error', 4000);
        }
    }

    onChange = e => {
        let userAccount = Object.assign({}, this.state.userAccount);
        userAccount[e.target.name] = e.target.value;
        this.setState({ userAccount }, () => {
            const errors = this.checkValid();
            this.setState({ errors });
        });
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
        this.setState({ userAccount }, () => {
            const errors = this.checkValid();
            this.setState({ errors });
        });
    }

    togglePass = (key) => {
        let currentType = this.state[key];
        currentType = currentType === 'password' ? 'text' : 'password';
        this.setState({ [key]: currentType });
    }

    render() {
        const { errors, userAccount, submitted, inputPasswordType, inputRePasswordType } = this.state;
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
                                    error={submitted && errors.username ? errors.username : ''}
                                    icon={"fas fa-user"}
                                    isValid={submitted && !errors.username}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Fullname</FormLabel>
                                <InputGroup 
                                    name="fullname"
                                    placeholder="Enter fullname..."
                                    onChange={this.onChange}
                                    value={userAccount.fullname}
                                    error={submitted && errors.fullname ? errors.fullname : ''}
                                    icon={"fas fa-user-plus"}
                                    isValid={submitted && !errors.fullname}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <InputGroup 
                                    name="email"
                                    placeholder="Enter email..."
                                    onChange={this.onChange}
                                    value={userAccount.email}
                                    error={submitted && errors.email ? errors.email : ''}
                                    icon={"fas fa-envelope"}
                                    isValid={submitted && !errors.email}
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
                                    error={submitted && errors.phone ? errors.phone : ''}
                                    icon={"fas fa-phone"}
                                    isValid={submitted && !errors.phone}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Address</FormLabel>
                                <InputGroup 
                                    name="address"
                                    placeholder="Enter address..."
                                    onChange={this.onChange}
                                    value={userAccount.address}
                                    error={submitted && errors.address ? errors.address : ''}
                                    icon={"fas fa-map-marker"}
                                    isValid={submitted && !errors.address}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <button 
                                    type="button" 
                                    className={`float-right btn btn-sm btn-toggle-pass ${inputPasswordType === 'password' ? 'btn-success' : 'btn-warning'}`}
                                    onClick={() => this.togglePass('inputPasswordType')}>
                                    { inputPasswordType === 'password' ? 'Show Pass' : 'Hide Pass' }
                                </button>
                                <InputGroup 
                                    type={inputPasswordType}
                                    name="password"
                                    placeholder="Enter password..."
                                    onChange={this.onChange}
                                    value={userAccount.password}
                                    error={submitted && errors.password ? errors.password: ''}
                                    icon={"fas fa-lock"}
                                    isValid={submitted && !errors.password}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Retype password</FormLabel>
                                <button 
                                    type="button" 
                                    // className={classnames('float-right', 'btn', 'btn-sm', 'btn-toggle-pass', { 'btn-success': inputRePasswwordType === 'password', 'btn-danger': inputRePasswwordType === 'text' })} 
                                    className={`float-right btn btn-sm btn-toggle-pass ${inputRePasswordType === 'password' ? 'btn-success' : 'btn-warning'}`}
                                    onClick={() => this.togglePass('inputRePasswordType')}>
                                    { inputRePasswordType === 'password' ? 'Show Pass' : 'Hide Pass' }
                                </button>
                                <InputGroup 
                                    type={inputRePasswordType}
                                    name="repassword"
                                    placeholder="Enter repassword..."
                                    onChange={this.onChange}
                                    value={userAccount.repassword}
                                    error={submitted && errors.repassword ? errors.repassword: ''}
                                    icon={"fas fa-lock"}
                                    isValid={submitted && !errors.repassword}
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
