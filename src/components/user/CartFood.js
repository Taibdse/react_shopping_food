import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { addFoodToCart, minusQuanity, removeCartItem } from '../../redux/actions/cartActions';
import { updateFood } from '../../redux/actions/foodActions';
import { setOrder } from '../../redux/actions/orderActions';
import { removeCart } from '../../redux/actions/cartActions';
import { toggleFormLoginUser } from '../../redux/actions/userAccountActions';
import { getTotalPaymentCart, getUnitPrice } from '../../services/payment';
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
        if(!cartItem || cartItem.quantity === 0) 
            return alert(`${food.name} in our shop is already out of quantity!, please choose other foods instead`);
        if(cartItem){
            if(food.quantity === cartItem.quantity) 
                return alert(`Shop does not have enough ${food.name} quantity for you, sorry for this`);
            this.props.addFoodToCart(food);
        }
    }

    minusQuantity = food => {
        this.props.minusQuanity(food);
    }

    order = () => {
        if(this.props.cart.length === 0) return alert('You have not chosen foods!!, please pick your ones');

        if(this.props.isAuthenticatedUser){
            this.props.cart.forEach(item => this.props.updateFood(item.food));
            this.props.setOrder(this.props.cart);
            setTimeout(() => { 
                this.props.removeCart();
                alert('Your order was successfully ordered')
             }, 500);
        } else {
            this.props.toggleFormLoginUser(true);
        }
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
                                    <img src={cartItem.food.image} className="img-fluid" alt=""/>
                                </div>
                                <div className="col-8">
                                    <h6>{ cartItem.food.name } <span style={{ color: 'yellow' }}>{ getUnitPrice(cartItem.food.price, cartItem.food.discount) * cartItem.quantity }$</span> </h6>
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
                    <div>
                        <h5>Total Payment: <span style={{ color:'yellow' }}>{ getTotalPaymentCart(this.props.cart) }$</span></h5>
                    </div>
                    <Button onClick={this.order} id="btnOrder" block className="mb-5">Order</Button>
                </div>
            </div>
        );
    }
}

CartFood.propTypes = {
    cart: PropTypes.array.isRequired,
    isAuthenticatedUser: PropTypes.bool.isRequired,
    addFoodToCart: PropTypes.func.isRequired,
    minusQuanity: PropTypes.func.isRequired,
    removeCartItem: PropTypes.func.isRequired,
    updateFood: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired,
    removeCart: PropTypes.func.isRequired,
    toggleFormLoginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    cart: state.cart.cart,
    isAuthenticatedUser: state.userAccount.isAuthenticated
})

export default connect(mapStateToProps, { addFoodToCart, minusQuanity, removeCartItem, updateFood, setOrder, removeCart, toggleFormLoginUser })(CartFood);
