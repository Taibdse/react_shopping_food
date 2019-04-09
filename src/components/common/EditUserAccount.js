import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormLabel } from 'react-bootstrap';
import InputGroup from './InputGroup';
import { isNotEmpty } from '../../validations/isNotEmpty';
import { isPhone } from '../../validations/isPhone';
import { isEmail } from '../../validations/isMail';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

class EditUserAccount extends React.Component {

    static propTypes = {
        curAccount: PropTypes.object.isRequired,
        updateAccount: PropTypes.func.isRequired,
        redirectLocation: PropTypes.string.isRequired
    };

    state = {
        errors: {},
        submitted: false,
        user: { username: '', email: '', address: '', phone: '', fullname: '' }
    };

    onChange = e => {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        this.setState({ user }, () => {
            const errors = this.checkValid();
            this.setState({ errors });
        });
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

    showToastMsg = (title, type) => Swal.fire({
        position: 'top-end',
        type, title,
        toast: true,
        showConfirmButton: false,
        timer: 4000
    })

    updateAccount = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        let errors = this.checkValid();
        if(!isNotEmpty(errors)){
            this.props.updateAccount(this.state.user);
            this.showToastMsg('Updated successfully!!', 'success');
            setTimeout(() => this.props.history.push(this.props.redirectLocation), 4200);
        } else {
            this.setState({ errors });
            this.showToastMsg('Invalid input data!!', 'error');
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ user: nextProps.curAccount });
    }

    componentDidMount = () => this.setState({ user: this.props.curAccount });

    resetForm = () => {
        const user = { username: '', email: '', address: '', phone: '', fullname: '' }
        this.setState({ user }, () => {
            const errors = this.checkValid();
            this.setState({ errors });
        })
    }

    render() {
        let { errors, user, submitted } = this.state;

        return (
            <div className="container">
                <div className="col-sm-8 col-md-6 mx-auto mt-5">
                    <div className="card card-body">
                        <form onSubmit={this.updateAccount}>
                            <FormGroup>
                                <FormLabel>Username</FormLabel>
                                <InputGroup 
                                    name="username"
                                    placeholder="Enter username..."
                                    onChange={this.onChange}
                                    value={user.username}
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
                                    value={user.fullname}
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
                                    value={user.email}
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
                                    value={user.phone}
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
                                    value={user.address}
                                    error={submitted && errors.address ? errors.address : ''}
                                    icon={"fas fa-map-marker"}
                                    isValid={submitted && !errors.address}
                                />
                            </FormGroup>
                            <button className="btn btn-outline-success float-right" type="submit">Save</button>
                            <button className="btn btn-outline-default float-right mr-2" type="button" onClick={this.resetForm}>Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditUserAccount);
