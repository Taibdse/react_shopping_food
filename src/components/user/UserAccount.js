import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {}
        };
    }

    render() {
        let { curAccount } = this.props;

        return (
            <React.Fragment>
                <h4 className="text-center font-italic mt-5">Your Account</h4>
                <div className="container">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>{ curAccount.username }</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong>Fullname: </strong> { curAccount.fullname }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Phone: </strong> { curAccount.phone }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Email: </strong> { curAccount.email }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Address: </strong> { curAccount.address }
                                    </li>
                                </ul>
                                <Link to="/user/edit_account" className="btn btn-outline-info float-right mt-3">Edit Info</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

UserAccount.propTypes = {
    curAccount: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    curAccount: state.userAccount.curAccount
})

export default connect(mapStateToProps, null)(UserAccount);
