import React from 'react';
import PropTypes from 'prop-types';

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: { 
                username: 'reactjs', 
                fullname: 'Reactjs Awesome', 
                phone: '0984738725', 
                email: 'reactjs@gmail.com', 
                address: '12 district, Ho Chi Minh city, VN',
            }
        };
    }

    render() {
        let { account } = this.state;
        return (
            <React.Fragment>
                <h4 className="text-center font-italic mt-5">Your Account</h4>
                <div className="container">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>{ account.username }</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong>Fullname: </strong> { account.fullname }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Phone: </strong> { account.phone }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Email: </strong> { account.email }
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Address: </strong> { account.address }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

UserAccount.propTypes = {};

export default UserAccount;
