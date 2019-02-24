import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { addFoodToCart, minusQuanity, removeCartItem } from '../../redux/actions/cartActions';
import classnames from 'classnames';

class CartFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCart: false
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.cart.length === 0){
            this.setState({ isShowCart: false });
        } else if(nextProps.cart.length === 1) {
            this.setState({ isShowCart: true });
        }
    }

    addQuantity = food => {
        let cartItem = this.props.cart.find(item => item.food.id === food.id);
        if(cartItem){
            this.props.addFoodToCart(food);
        }
    }

    minusQuantity = food => {
        this.props.minusQuanity(food);
    }

    order = () => {
        console.log('ordered');
    }

    toggleCart = () => {
        if(this.props.cart.length !== 0){
            this.setState({ isShowCart: !this.state.isShowCart });
        } else {
            alert('You have not chosen any food');
        }
    }

    removeCartItem = (food) => {
        this.props.removeCartItem(food);
    }

    render() {
        let { isShowCart } = this.state;
        return (
            <div id="cart-area" className={classnames({ 'show-cart': isShowCart, 'hide-cart': !isShowCart })}>
                <div id="toggle-cart-area">
                    <span id="toggle-cart" onClick={this.toggleCart}>
                        <i className="fas fa-cog"></i>
                    </span>
                </div>
                <div id="cart">
                    <h3 className="text-center my-4">Cart</h3>
                    { this.props.cart.map(cartItem => (
                        <div className="card card-body card-cart-item mb-3" key={cartItem.food.id}>
                            <div className="delete-cart-item" onClick={() => this.removeCartItem(cartItem.food)}>
                                <i className="fas fa-times"></i>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <img src={cartItem.food.image} className="img-fluid"/>
                                </div>
                                <div className="col-8">
                                    <h6>{ cartItem.food.name }</h6>
                                    <p style={{ width: '150px' }}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <Button variant="light" onClick={() => this.minusQuantity(cartItem.food)}>-</Button>
                                        </InputGroup.Prepend>
                                        <FormControl type="number" style={{ width: '10px', textAlign: 'center' }} value={cartItem.quantity}/>
                                        <InputGroup.Append>
                                            <Button variant="light" onClick={() => this.addQuantity(cartItem.food)}>+</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) }
                    <Button onClick={this.order} id="btnOrder" block className="mb-5">Order</Button>
                </div>
            </div>
        );
    }
}

CartFood.propTypes = {
    cart: PropTypes.array.isRequired,
    addFoodToCart: PropTypes.func.isRequired,
    minusQuanity: PropTypes.func.isRequired,
    removeCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    cart: state.cart.cart
})

export default connect(mapStateToProps, { addFoodToCart, minusQuanity, removeCartItem })(CartFood);
