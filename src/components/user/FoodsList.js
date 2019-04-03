import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { addFoodToCart } from '../../redux/actions/cartActions';
import { updateFood } from '../../redux/actions/foodActions';
import { getUnitPrice } from '../../services/payment';
import { sortByNumberValue, sortByTextValue, sortByDiscoutedPrice } from '../../services/sortation';
import { filterBySearchValue, filterByDiscountedPrice } from '../../services/filters';
import Swal from 'sweetalert2';

class FoodsList extends React.Component {
   static propTypes = {
        foodList: PropTypes.array.isRequired,
        addFoodToCart: PropTypes.func.isRequired,
        updateFood: PropTypes.func.isRequired,
        sortBy: PropTypes.object.isRequired,
        filteredObj: PropTypes.object.isRequired,
    };

    addToCart = (food) => {
        // alert(`You have just added ${food.name} to cart`);
        if(food.quantity === 0) return Swal.fire({
            position: 'top-end',
            type: 'warning',
            toast: true,
            title: 'This food is out of quanity!',
            showConfirmButton: false,
            timer: 3000
        })
        this.props.addFoodToCart(food);
    }

    filterFoods = (foods) => {
        let { name, priceFrom, priceTo } = this.props.filteredObj;
        let arr1 = filterByDiscountedPrice(foods, priceFrom, priceTo);
        return filterBySearchValue(arr1, 'name', name);
    }

    sortFoods = (foods) => {
        let { name, price, discount } = this.props.sortBy;
        let arr = [];
        if(name !== 'none') arr = sortByTextValue(foods, 'name', name);
        else if(price !== 'none') arr = sortByDiscoutedPrice(foods, price);
        else if(discount !== 'none') arr = sortByNumberValue(foods, 'discount', discount);
        else arr = foods.slice();
        return arr;
    }

    render() {
        const foods = this.filterFoods(this.props.foodList);
        const foodList = this.sortFoods(foods);

        return (
            <Row>
                { foodList.map(food => (
                    <Col key={food.id} sm={6} md={4} lg={3} className="mb-5">
                        <Card style={{ margin: 'auto' }} className="card-food-item">
                            <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
                                <Card.Img variant="top" src={ food.image } />
                            </div>
                            <Card.Body>
                                <Card.Title>{ food.name }
                                    <Badge variant="warning" className="float-right">{ `-${food.discount}%` }</Badge>
                                </Card.Title>
                                <Card.Text style={{ fontSize: '0.9em' }}>
                                    { food.description }
                                </Card.Text>
                                <div className="price">
                                    <span className="new-price">${ getUnitPrice(food.price, food.discount) }</span>
                                    <span className="old-price">${ food.price }</span>
                                </div>
                                <Button variant="info" onClick={() => { this.addToCart(food) }}>Buy Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )) }
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    foodList: state.food.foods,
    filteredObj: state.food.filteredObj,
    sortBy: state.sort.sortBy
})

export default connect(mapStateToProps, { addFoodToCart, updateFood })(FoodsList);
