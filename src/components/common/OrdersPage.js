import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getTotalPaymentCart } from '../../services/payment';
import { getTime } from '../../services/time';

class OrdersPage extends React.Component {

    static propTypes = {
        orders: PropTypes.array.isRequired,
        userAccount: PropTypes.object.isRequired,
    };

    getFoodNames = cart => cart.data.map(item => (<div key={item.food.id} style={{ whiteSpace: 'nowrap' }}>{ item.food.name }</div>))
    
    isAdminRoute = () => this.props.location.pathname.indexOf('/admin') > -1;

    getHeaderTitle = () => {
        if(this.isAdminRoute()) return `${this.props.userAccount.username}'s order history`
        return 'Your order here';
    }
    render() {
        const orders = this.props.orders.filter(order => order.cart.userId === this.props.userAccount.id);
        let pathname = this.props.location.pathname;
        
        return (
            <div>
                <h3 className="text-center font-italic my-3">{ this.getHeaderTitle() }</h3>
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
                                            <td style={{ whiteSpace: 'nowrap' }}>{ getTime(order.time) }</td>
                                            <td>
                                            {/* /user_orders */}
                                                <Link className="btn btn-primary btn-sm" to={`${pathname}/${order.id}`}>Detail</Link>
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

export default withRouter(OrdersPage);
