import React from 'react';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import { filterFoods } from '../../redux/actions/foodActions';
import { isNotEmpty } from '../../validations/isNotEmpty';

class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredObj: {}
        };
    }

    componentWillReceiveProps = (nextProps) => {
        let filteredObj = nextProps.filteredObj;
        if(!isNotEmpty(filteredObj)) {
            filteredObj = { name: '', priceFrom: '', priceTo: '', quantityFrom: '', quantityTo: '' };
        }
        this.setState({ filteredObj });
    }

    onChange = e => {
        let filteredObj = Object.assign({}, this.state.filteredObj);
        let { name, value } = e.target;
        filteredObj[name] = value;
        this.setState({ filteredObj }, () => {
            this.props.filterFoods(this.state.filteredObj)
        });
    }

    render() {
        let { filteredObj } = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    <h5>
                        <i className="fa fa-filter mr-2"></i>
                        Search Foods
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <input className="form-control" placeholder="Search food name..." name="name" onChange={this.onChange} value={ filteredObj.name }/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="row">
                                <div className="col-6">
                                    <input type="number" className="form-control" placeholder="Price from..." name="priceFrom" onChange={this.onChange} value={ filteredObj.priceFrom }/>
                                </div>
                                <div className="col-6">
                                    <input type="number" className="form-control" placeholder="Price to..." name="priceTo" onChange={this.onChange} value={ filteredObj.priceTo }/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-6">
                                    <input type="number" className="form-control" placeholder="Quantity from..." name="quantityFrom" onChange={this.onChange} value={ filteredObj.quantityFrom }/>
                                </div>
                                <div className="col-6">
                                    <input type="number" className="form-control" placeholder="Quantity to..." name="quantityTo" onChange={this.onChange} value={ filteredObj.quantityTo }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FilterForm.propTypes = {
    filteredObj: PropTypes.object.isRequired,
    filterFoods: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
    filteredObj: state.food.filteredObj
})

export default connect(mapStateToProps, { filterFoods })(FilterForm);
