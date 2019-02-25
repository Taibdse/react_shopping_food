import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormLabel, Form, Card, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewFood, clearForm, updateFood, toggleForm } from '../../redux/actions/foodActions';
import { isNotEmpty } from '../../validations/isNotEmpty';
import { isPositiveInt } from '../../validations/isPositiveInt';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class FoodForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            food: {},
            error: {},
        };
    }

    validateInput = () => {
        let { name, price, quantity, discount, image, description } = this.state.food;
        let error = {};
        if(!isNotEmpty(name)) error.name = 'Name is required!';
        if(!isNotEmpty(description) || description.length < 10) error.description = 'Description is required and min length is 10!';
        if(!isNotEmpty(image)) error.image = 'Image link is required!';
        if(!isPositiveInt(price)) error.price = 'Price must be positive integer!';
        if(!isPositiveInt(quantity)) error.quantity = 'Quantity must be positive integer!';
        if(!isPositiveInt(discount)) error.discount = 'Discount must be positive integer!';
        return error;
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { food }  = this.state;
        let error = this.validateInput();
        this.setState({ error });
        if(isNotEmpty(error)) return alert('Invalid input data!');
        if(food.id){
            this.props.updateFood(food);
        } else {
            this.props.addNewFood(food);
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let food = nextProps.food;
        if(!isNotEmpty(food)) {
            food = { name: '', price: '', discount: '', quantity: '', image: '', description: '' }
        }
        this.setState({ food, error: {} });
    }

    clearForm = (e) => {
        e.preventDefault();
        // this.setState({ error: {} });
        this.props.clearForm();
    }

    onChange = e => {
        let { food } = this.state;
        let { name, value } = e.target;
        food[name] = value;
        this.setState({ food: Object.assign({}, food) });
    }

    toggleForm = () => {
        this.props.toggleForm(!this.props.showForm);
    }

    showBtnText = () => {
        return this.props.showForm ? 'Hide Form' : this.props.food.id ? 'Update current food now' : 'Add More Foods';
    }

    componentDidMount = () => console.log('componentDidMount');

    render() {
        let { error } = this.state;
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <button className="btn btn-primary btn-block mb-3" onClick={this.toggleForm}>
                            { this.showBtnText() }
                        </button>
                    </div>
                </div>

                { this.props.showForm && <Card>
                    <Card.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <FormLabel>Food name</FormLabel>
                                        <InputGroup 
                                            name="name"
                                            placeholder="Enter food name..."
                                            onChange={this.onChange}
                                            value={this.state.food.name}
                                            error={error.name}
                                            icon={"fas fa-hamburger"}
                                        />
                                        {/* <input className="form-control" type="text" name="name" onChange={this.onChange} value={this.state.food.name} placeholder="Enter food name..."/> */}
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <FormLabel>Price</FormLabel>
                                        <InputGroup 
                                            type="number"
                                            name="price"
                                            placeholder="Enter price..."
                                            onChange={this.onChange}
                                            value={this.state.food.price}
                                            error={error.price}
                                            icon={"fas fa-dollar-sign"}
                                        />
                                        {/* <input className="form-control" type="number" name="price" onChange={this.onChange} value={this.state.food.price} placeholder="Enter price..."/> */}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="">
                                <Col sm={6}>
                                    <FormGroup>
                                        <FormLabel>Discount</FormLabel>
                                        <InputGroup 
                                            type="number"
                                            name="discount"
                                            placeholder="Enter discount..."
                                            onChange={this.onChange}
                                            value={this.state.food.discount}
                                            error={error.discount}
                                            icon={"fas fa-percent"}
                                        />
                                        {/* <input className="form-control" type="number" name="discount" onChange={this.onChange} value={this.state.food.discount} placeholder="Enter discount..."/> */}
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <FormLabel>Quantity</FormLabel>
                                        <InputGroup 
                                            type="number"
                                            name="quantity"
                                            placeholder="Enter quantity..."
                                            onChange={this.onChange}
                                            value={this.state.food.quantity}
                                            error={error.quantity}
                                            icon={"fas fa-stream"}
                                        />
                                        {/* <input className="form-control" type="number" name="quantity" onChange={this.onChange} value={this.state.food.quantity} placeholder="Enter price..."/> */}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="">
                                <Col>
                                    <FormGroup>
                                        <FormLabel>Image</FormLabel>
                                        <InputGroup 
                                            name="image"
                                            placeholder="Enter image link..."
                                            onChange={this.onChange}
                                            value={this.state.food.image}
                                            error={error.image}
                                            icon={"fas fa-link"}
                                        />
                                        {/* <input className="form-control" type="text" name="image" onChange={this.onChange} value={this.state.food.image} placeholder="Enter Url..."/> */}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="">
                                <Col>
                                    <FormGroup>
                                        <FormLabel>Description</FormLabel>
                                        <TextAreaFieldGroup
                                            name="description"
                                            onChange={this.onChange}
                                            value={this.state.food.description ? this.state.food.description: ''}
                                            placeholder="Enter description..."
                                            error={error.description}
                                            info={false}
                                        />
                                        {/* <textarea className="form-control" name="description" onChange={this.onChange} value={this.state.food.description ? this.state.food.description: ''} rows="4" placeholder="Enter description..." /> */}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button type="submit" variant="success" className="float-right">{ this.props.food.id ? 'Update' : 'Add' }</Button>
                            <Button type="reset" variant="secondary" className="float-right mr-2" onClick={this.clearForm}>Clear</Button>
                        </Form>
                    </Card.Body>
                </Card>
             }
            </Fragment>
        );
    }
}

FoodForm.propTypes = {
    food: PropTypes.object.isRequired,
    showForm: PropTypes.bool.isRequired,
    toggleForm: PropTypes.func.isRequired,
    addNewFood: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    updateFood: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    food: state.food.food,
    showForm: state.food.showForm
})

// const mapDispatchToProps = function(dispatch){
//     return {
//         clearEdit: () => dispatch({ type: CLEAR_EDIT_FOOD }),
//         addNewFood
//     }
// }

export default connect(mapStateToProps, { addNewFood, clearForm, updateFood, toggleForm })(FoodForm);
