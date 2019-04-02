import React from 'react';
import PropTypes from 'prop-types';
import OrdersPage from '../common/OrdersPage';
import { connect } from 'react-redux';
import { isNotEmpty } from '../../validations/isNotEmpty';
import { Link } from 'react-router-dom';

class ManageUserOrders extends React.Component {

    static propTypes = {
        orders: PropTypes.array.isRequired,
        accounts: PropTypes.array.isRequired
    };

    state = {
        userAccount: {}
    };

    componentDidMount = () => {
        let id = this.props.match.params.userId;
        let userAccount = this.props.accounts.find(acc => acc.id === id);
        this.setState({ userAccount });
    }

    render() {
        let { userAccount } = this.state;
        let element;
        if(isNotEmpty(userAccount)){
            element = (
                <OrdersPage 
                    orders={this.props.orders} 
                    userAccount={this.state.userAccount} 
                />
            );
        } else {
            element = (
                <div className="text-center font-italic" style={{ marginTop: '200px' }}>
                    <h2>This user Not Found</h2>
                    <p>Please come back to <Link to="/admin">Home page</Link> or <Link to="/admin/users_manage">Users management page</Link></p>
                </div>
            )
        }
        return (
            <React.Fragment>
                { element }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    accounts: state.userAccount.accounts
})

export default connect(mapStateToProps)(ManageUserOrders);
