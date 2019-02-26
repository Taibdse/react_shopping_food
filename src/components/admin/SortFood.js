import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSort } from '../../redux/actions/sortActions';

class SortFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortTypes: [
                { value: 'none', text: 'None' },
                { value: 'asc', text: 'Asc' },
                { value: 'desc', text: 'Desc' }
            ],
        };
    }

    onChange = (e) => {
        // let sortBy = Object.assign({}, this.state.sortBy);
        let { name, value } = e.target;
        let sortBy = { name: 'none', quantity: 'none', price: 'none', discount: 'none' };
        sortBy[name] = value;
        this.props.setSort(sortBy);
    }

    render() {
        let options = this.state.sortTypes.map(type => (
            <option key={type.value} value={type.value}>{type.text}</option>
        )) 
        let { name, price, discount, quantity } = this.props.sortBy;
        return (
            <div className="card mt-3">
                <div className="card-header">
                    <h5>
                        <i className="fas fa-filter mr-3"></i>
                        Sortation
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="form-group col-sm-3">
                            <label>By Name</label>
                            <select className="form-control" name="name" 
                                onChange={this.onChange} value={name}>
                                { options }
                            </select>
                        </div>
                        <div className="form-group col-sm-3" >
                            <label>By price</label>
                            <select className="form-control" name="price" 
                                onChange={this.onChange} value={price}>
                                { options }
                            </select>
                        </div>
                        <div className="form-group col-sm-3" >
                            <label>By discount</label>
                            <select className="form-control" name="discount" 
                                onChange={this.onChange} value={discount}>
                                { options }
                            </select>
                        </div>
                        <div className="form-group col-sm-3">
                            <label>By quantity</label>
                            <select className="form-control" name="quantity" 
                                onChange={this.onChange} value={quantity}>
                                { options }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SortFood.propTypes = {
    sortBy: PropTypes.object.isRequired,
    setSort: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    sortBy: state.sort.sortBy
})

export default connect(mapStateToProps, { setSort })(SortFood);
