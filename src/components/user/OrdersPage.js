import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// {
//     order: [
//         { quantity: 10, food: { ... } }
//     ]
//     time: ''
// }

class OrdersPage extends React.Component {

    getFoodNames = (cart) => cart.map(item => (<div key={item.food.id} style={{ whiteSpace: 'nowrap' }}>{ item.food.name }</div>))

    getDateTime = (timestamp) => new Date(timestamp).toLocaleTimeString() + ' ' + new Date().toLocaleDateString();

    getTotalOrderPrice = (cart) => cart.reduce((sum, item) => sum += item.food.price * item.quantity , 0);

    render() {
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
                                    { this.props.orders.map((order, index) => (
                                        <tr key={order.id}>
                                            <td>{ index + 1 }</td>
                                            <td style={{ whiteSpace: 'nowrap' }}>{ this.getFoodNames(order.cart) }</td>
                                            <td>{ this.getTotalOrderPrice(order.cart) }$</td>
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
    orders: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    orders: state.order.orders
})

export default connect(mapStateToProps, null)(OrdersPage);
