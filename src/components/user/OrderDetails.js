import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // console.log(this.props.match.params.id)
    }

    getOrder = () => {
        let id = this.props.match.params.id;
        return this.props.orders.find(order => order.id === id);
    }

    getTime = (timestamp) => new Date(timestamp).toLocaleTimeString() + ' ' + new Date(timestamp).toLocaleDateString();

    getTotalPayment = (cart) => cart.reduce((sum, cartItem) => sum += cartItem.quantity * cartItem.food.price, 0);

    render() {
        let order = this.getOrder();
        let ele = ( <h3 className="font-italic text-center" style={{ marginTop: '150px' }}>No order found here</h3> );
        if(order) {
            ele = ( 
                <div className="container pt-5">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Ordered Time: { this.getTime(order.time) }</h4>
                            </div>
                            <div className="card-body">
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
                                        { order.cart.map((cartItem, index) => (
                                            <tr key={cartItem.food.id}>
                                                <td>{ index + 1 }</td>
                                                <td>
                                                    <img src={ cartItem.food.image } style={{ width: '150px' }}/>
                                                </td>
                                                <td>{ cartItem.food.name }</td>
                                                <td>{ cartItem.quantity }</td>
                                                <td>{ cartItem.food.price }$</td>
                                                <td>{ cartItem.food.price * cartItem.quantity }$</td>
                                            </tr>
                                        )) }
                                        <tr>
                                            <td colSpan={5}>Total Payment</td>
                                            <td>{ this.getTotalPayment(order.cart) }$</td>
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
