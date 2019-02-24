import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// {
//     order: [
//         { quantity: 10, food: { ... } }
//     ]
//     time: ''
// }

class OrdersPage extends React.Component {

    getFoodNames = (cart) => cart.map(item => (<div style={{ whiteSpace: 'nowrap' }}>{ item.food.name }</div>))

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
                                        <th style={{ whiteSpace: 'nowrap' }}>Total Price</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.props.orders.map((order, index) => (
                                        <tr key={order.time}>
                                            <td>{ index + 1 }</td>
                                            <td style={{ whiteSpace: 'nowrap' }}>{ this.getFoodNames(order.cart) }</td>
                                            <td>{ this.getTotalOrderPrice(order.cart) }$</td>
                                            <td style={{ whiteSpace: 'nowrap' }}>{ this.getDateTime(order.time) }</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm" >Detail</button>
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
