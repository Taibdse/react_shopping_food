import React from 'react';
import PropTypes from 'prop-types';
import OrdersPage from '../common/OrdersPage';
import { connect } from 'react-redux';

class UserOrders extends React.Component {

    static propTypes = {
        orders: PropTypes.array.isRequired,
        userAccount: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div>
                <OrdersPage orders={this.props.orders} userAccount={this.props.userAccount} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    userAccount: state.userAccount.curAccount
})

export default connect(mapStateToProps)(UserOrders);
