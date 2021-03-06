import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { deleteFood, editFood, toggleForm } from '../../redux/actions/foodActions';
import Pagination from 'react-js-pagination';
import { filterByRangeNumber, filterBySearchValue } from '../../services/filters';
import { sortByNumberValue, sortByTextValue } from '../../services/sortation';
import { isNotEmpty } from '../../validations/isNotEmpty';
import Swal from 'sweetalert2';

class Foods extends React.Component {
    static propTypes = {
        foods: PropTypes.array.isRequired,
        sortBy: PropTypes.object.isRequired,
        filteredObj: PropTypes.object.isRequired,
        editFood: PropTypes.func.isRequired,
        deleteFood: PropTypes.func.isRequired,
    };

    state = {
        activePage: 1,
        itemsCountPerPage: 10
    };

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
      }

    delete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            // text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if(result.value){
            this.props.deleteFood(id);
            setTimeout(() => {
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    toast: true,
                    title: 'Deleted successfully!',
                    showConfirmButton: false,
                    timer: 3000
                })
            }, 500);
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
        let arr = [];
        if(name !== 'none') arr = sortByTextValue(foods, 'name', name);
        else if(price !== 'none') arr = sortByNumberValue(foods, 'price', price);
        else if(quantity !== 'none') arr = sortByNumberValue(foods, 'quantity', quantity);
        else if(discount !== 'none') arr = sortByNumberValue(foods, 'discount', discount);
        else arr = foods.slice();
        return arr;
    }

    paginateFoods = (foods) => {
        if(!isNotEmpty(foods)) return [];
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
