import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { deleteFood, editFood, toggleForm } from '../../redux/actions/foodActions';
import Pagination from 'react-js-pagination';
import { filterByRangeNumber, filterBySearchValue } from '../../services/filters';
import { sortByNumberValue, sortByTextValue } from '../../services/sortation';

class Foods extends React.Component {
    state = {
        activePage: 1,
        itemsCountPerPage: 10
    }

    componentWillReceiveProps = (nextProps) => {
    }

    componentDidMount = () => {
       
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

    delete = (id) => {
        let sure = window.confirm('Are you sure?');
        if(sure){
            this.props.deleteFood(id);
        }
    };

    edit = food => {
        this.props.editFood(food);
        this.props.toggleForm(true);
        document.querySelector('html').scrollTop = 0;
    }

    filterFoods = (foods) => {
        let { name, priceFrom, priceTo, quantityFrom, quantityTo } = this.props.filteredObj;
        let arr1 = filterByRangeNumber(foods, 'price', priceFrom, priceTo);
        let arr2 = filterByRangeNumber(arr1, 'quantity', quantityFrom, quantityTo);
        return filterBySearchValue(arr2, 'name', name);
    }

    sortFoods = (foods) => {
        let { name, quantity, price, discount } = this.props.sortBy;
        console.log(name, quantity, price, discount);
        let arr1 = sortByTextValue(foods, 'name', name);
        let arr2 = sortByNumberValue(arr1, 'price', price);
        let arr3 = sortByNumberValue(arr2, 'quantity', quantity);
        let arr4 = sortByNumberValue(arr3, 'discount', discount);
        return arr4;
    }

    paginateFoods = (foods) => {
        let { activePage, itemsCountPerPage } = this.state;
        let startIndex = itemsCountPerPage * (activePage - 1);
        return foods.filter((food, index) => (index >= startIndex && index < startIndex + itemsCountPerPage))
    }

    render() {
        let filteredFoods = this.filterFoods(this.props.foods);
        let sortedFoods = this.sortFoods(filteredFoods);
        let foods = this.paginateFoods(sortedFoods);
        let { itemsCountPerPage, activePage } = this.state;

        return (
           <Fragment>
            <Pagination
                activePage={ activePage }
                itemsCountPerPage={ itemsCountPerPage }
                totalItemsCount={ filteredFoods.length }
                pageRangeDisplayed={ 4 }
                onChange={ this.handlePageChange }
            />
            <Table className="text-center" responsive="lg" striped hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Food</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food, index) => (
                        <tr key={food.id}>
                            <td>{index + (activePage - 1) * itemsCountPerPage + 1}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>{food.name}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>{food.price} {food.unit}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>{food.discount}%</td>
                            <td>{food.quantity}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Button variant="danger" size="sm" onClick={() => this.delete(food.id)}>Delete</Button>{' '}
                                <Button variant="info" size="sm" onClick={() => this.edit(food)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
           </Fragment>
        );
    }
}

Foods.propTypes = {
    foods: PropTypes.array.isRequired,
    sortBy: PropTypes.object.isRequired,
    filteredObj: PropTypes.object.isRequired,
    editFood: PropTypes.func.isRequired,
    deleteFood: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    foods: state.food.foods,
    filteredObj: state.food.filteredObj,
    sortBy: state.sort.sortBy
})

// const mapDispatchToProps = function(dispatch){
//     return {
//         deleteFood: id => dispatch({ type: DELETE_FOOD, payload: id }),
//         editFood: food => dispatch({ type: EDIT_FOOD, payload: food })
//     }
// }

export default connect(mapStateToProps, { deleteFood, editFood, toggleForm })(Foods);
