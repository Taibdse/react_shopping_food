import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormLabel, Form, Card, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewFood, clearForm, updateFood, toggleForm } from '../../redux/actions/foodActions';
import { isNotEmpty } from '../../validations/isNotEmpty';

class FoodForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            food: {},
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { food }  = this.state;
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
        this.setState({ food });
    }

    clearForm = (e) => {
        e.preventDefault();
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
                                        <input className="form-control" type="text" name="name" onChange={this.onChange} value={this.state.food.name} placeholder="Enter food name..."/>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <FormLabel>Price</FormLabel>
                                        <input className="form-control" type="number" name="price" onChange={this.onChange} value={this.state.food.price} placeholder="Enter price..."/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="">
                                <Col sm={6}>
                                    <FormGroup>
                                        <FormLabel>Discount</FormLabel>
                                        <input className="form-control" type="number" name="discount" onChange={this.onChange} value={this.state.food.discount} placeholder="Enter discount..."/>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <FormLabel>Quantity</FormLabel>
                                        <input className="form-control" type="number" name="quantity" onChange={this.onChange} value={this.state.food.quantity} placeholder="Enter price..."/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="">
                                <Col>
                                    <FormGroup>
                                        <FormLabel>Image</FormLabel>
                                        <input className="form-control" type="text" name="image" onChange={this.onChange} value={this.state.food.image} placeholder="Enter Url..."/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="">
                                <Col>
                                    <FormGroup>
                                        <FormLabel>Description</FormLabel>
                                        <textarea className="form-control" name="description" onChange={this.onChange} value={this.state.food.description ? this.state.food.description: ''} rows="4" placeholder="Enter description..." />
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
