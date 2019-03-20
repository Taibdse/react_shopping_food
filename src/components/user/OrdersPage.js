import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPaymentCart } from '../../services/payment';

// {
//     order: [
//         { quantity: 10, food: { ... } }
//     ]
//     time: ''
// }

class OrdersPage extends React.Component {

    getFoodNames = (cart) => cart.data.map(item => (<div key={item.food.id} style={{ whiteSpace: 'nowrap' }}>{ item.food.name }</div>))

    getDateTime = (timestamp) => new Date(timestamp).toLocaleTimeString() + ' ' + new Date().toLocaleDateString();

    render() {
        console.log(this.props.orders);
        const orders = this.props.orders.filter(order => order.cart.userId === this.props.userAccount.id);
        console.log(orders);
        return (
            
            <div>
                <h3 className="text-center font-italic my-3">Your order here</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-12 table-responsive">
                            <table className="table table-striped table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Foods</th>
                                        <th>Payment</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { orders.map((order, index) => (
                                        <tr key={order.id}>
                                            <td>{ index + 1 }</td>
                                            <td style={{ whiteSpace: 'nowrap' }}>{ this.getFoodNames(order.cart) }</td>
                                            <td>{ getTotalPaymentCart(order.cart.data) }$</td>
                                            <td style={{ whiteSpace: 'nowrap' }}>{ this.getDateTime(order.time) }</td>
                                            <td>
                                                <Link className="btn btn-primary btn-sm" to={`/user_orders/${order.id}`}>Detail</Link>
                                            </td>
                                        </tr>
                                    )) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

OrdersPage.propTypes = {
    orders: PropTypes.array.isRequired,
    userAccount: PropTypes.object.isRequired,
    
};

const mapStateToProps = state => ({
    orders: state.order.orders,
    userAccount: state.userAccount.curAccount
})

export default connect(mapStateToProps, null)(OrdersPage);
