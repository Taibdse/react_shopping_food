import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormLabel } from 'react-bootstrap';
import InputGroup from './InputGroup';
import { isNotEmpty } from '../../validations/isNotEmpty';
import { isPhone } from '../../validations/isPhone';
import { isEmail } from '../../validations/isMail';
import { withRouter } from 'react-router-dom';

class EditUserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: { username: '', email: '', address: '', phone: '', fullname: '' }
        };
    }

    onChange = e => {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        this.setState({ user });
    }

    checkValid = () => {
        let { username, fullname, email, address, phone } = this.state.user;
        let errors = {};
        if(!isNotEmpty(username)) errors.username = 'Username is required';
        if(!isNotEmpty(address)) errors.address = 'Address is required';
        if(!isNotEmpty(fullname)) errors.fullname = 'Fullname is required';
        if(!isEmail(email)) errors.email = 'Email must be right format';
        if(!isPhone(phone)) errors.phone = 'Phone must be 9 - 12 digits';
        return errors;
    }

    updateAccount = e => {
        e.preventDefault();
        let errors = this.checkValid();
        if(!isNotEmpty(errors)){
            this.props.updateAccount(this.state.user);
            this.props.history.push(this.props.redirectLocation);
        } else {
            this.setState({ errors });
            alert('Invalid input data!!');
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ user: nextProps.curAccount });
    }

    componentDidMount = () => this.setState({ user: this.props.curAccount });

    render() {
        let { errors, user } = this.state;

        return (
            <div className="container">
                <div className="col-sm-8 mx-auto mt-5">
                    <div className="card card-body">
                        <form onSubmit={this.updateAccount}>
                            <FormGroup>
                                <FormLabel>Username</FormLabel>
                                <InputGroup 
                                    name="username"
                                    placeholder="Enter username..."
                                    onChange={this.onChange}
                                    value={user.username}
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
                                    value={user.fullname}
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
                                    value={user.email}
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
                                    value={user.phone}
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
                                    value={user.address}
                                    error={errors.address}
                                    icon={"fas fa-hamburger"}
                                />
                            </FormGroup>
                            <button className="btn btn-outline-success float-right" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditUserAccount.propTypes = {
    curAccount: PropTypes.object.isRequired,
    updateAccount: PropTypes.func.isRequired,
    redirectLocation: PropTypes.string.isRequired
};



export default withRouter(EditUserAccount);
