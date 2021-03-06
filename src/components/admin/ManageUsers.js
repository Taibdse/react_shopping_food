import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import classnames from 'classnames';
import { removeUserAccount } from '../../redux/actions/userAccountActions';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

class ManageUsers extends React.Component {

    static propTypes = {
        users: PropTypes.array.isRequired,
        removeUserAccount: PropTypes.func.isRequired
    };

    state = {
        users: []
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({ users: nextProps.users.map(item => { item.open = false; return item }) });
    }

    componentDidMount = () => {
        this.setState({ users: this.props.users.map(item => { item.open = false; return item }) });
    }

    toggleUserInfo = id => {
        let users = this.state.users.slice();
        let index = users.findIndex(u => u.id === id)
        users[index].open = !users[index].open;
        this.setState({ users });
    }

    removeUser = async (user) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if(result.value){
            this.props.removeUserAccount(user.id);
            setTimeout(() => {
                Swal.fire({
                    title: 'Deleted successfully',
                    toast: true,
                    type: 'success',
                    timer: 4000
                })
            }, 500);
        }
    }

    editUser = (user) => {
        this.props.history.push(`/admin/edit_user_account/${user.id}`);
    }

    checkOrderHistory = user => {
        this.props.history.push(`/admin/manage_user_orders/${user.id}`);
    }

    render() {
        let plusSign = (<i className="fas fa-plus" style={{ fontSize:'0.5em' }}></i>);
        let minusSign = (<i className="fas fa-minus" style={{ fontSize:'0.5em' }}></i>);

        return (
           <div className="container">
                <h2 className="text-center font-italic my-5">User Account Management</h2>
                {this.state.users.map(user => (
                    <React.Fragment key={user.id}>
                        <div onClick={() => this.toggleUserInfo(user.id)} className={classnames('card card-header mt-2 header-user-acount-admin-page', { 'header-user-acount-admin-page-active': user.open })} style={{ cursor: 'pointer' }}>
                            <h4>{ user.open ? minusSign : plusSign } { user.username }</h4>
                        </div>
                        <Collapse in={user.open}>
                            <div className="card card-body">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong>Fullname: </strong> { user.fullname }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Email: </strong> { user.email }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Phone: </strong> { user.phone }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Address: </strong> { user.address }
                                    </li>
                                </ul>
                                <div className="mt-3">
                                    <button className="btn btn-outline-info float-right ml-2" onClick={() => this.editUser(user)}>Edit</button>
                                    <button className="btn btn-outline-danger float-right ml-2" onClick={() => this.removeUser(user)}>Remove</button>
                                    <button className="btn btn-outline-primary float-right" onClick={() => this.checkOrderHistory(user)}>See Order</button>
                                </div>
                            </div>
                        </Collapse>
                    </React.Fragment>
                ))}
           </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.userAccount.accounts
})

export default connect(mapStateToProps, { removeUserAccount })( withRouter(ManageUsers) );
