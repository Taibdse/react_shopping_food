import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTotalPaymentCart, getUnitPrice } from '../../services/payment';
import { getTime } from '../../services/time';
import { isNotEmpty } from '../../validations/isNotEmpty';

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {}
        };
    }

    componentDidMount = () => {
        let orderId = this.props.match.params.orderId;
        let order = this.props.orders.find(order => order.id === orderId);
        this.setState({ order });
    }

    render() {
        let { order } = this.state;
        let ele = ( <h3 className="font-italic text-center" style={{ marginTop: '150px' }}>No order found here</h3> );
        if(isNotEmpty(order)) {
            ele = ( 
                <div className="container pt-5">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Ordered Time: { getTime(order.time) }</h4>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table table-hover table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Food</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { order.cart.data.map((cartItem, index) => {
                                            let { food } = cartItem;
                                            let unitPrice = getUnitPrice(food.price, food.discount);
                                            return (
                                                <tr key={cartItem.food.id}>
                                                    <td>{ index + 1 }</td>
                                                    <td>
                                                        <img src={ food.image } style={{ width: '150px' }} alt={food.name}/>
                                                    </td>
                                                    <td>{ food.name }</td>
                                                    <td>{ cartItem.quantity }</td>
                                                    <td>{ unitPrice }$</td>
                                                    <td>{ unitPrice * cartItem.quantity }$</td>
                                                </tr>
                                            )
                                        }) }
                                        <tr>
                                            <td colSpan={5}>Total Payment</td>
                                            <td>{ getTotalPaymentCart(order.cart.data) }$</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                    </div>
                </div>
            )
        }

        return (
            <React.Fragment>
                { ele }
            </React.Fragment>
        );
    }
}

OrderDetails.propTypes = {
    orders: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    orders: state.order.orders
})

export default connect(mapStateToProps, null)( withRouter(OrderDetails) );
