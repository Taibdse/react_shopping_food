import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSort } from '../../redux/actions/sortActions';

class SortFood extends React.Component {

    static propTypes = {
        sortBy: PropTypes.object.isRequired,
        setSort: PropTypes.func.isRequired
    };

    state = {
        sortTypes: [
            { value: 'none', text: 'None' },
            { value: 'asc', text: 'Asc' },
            { value: 'desc', text: 'Desc' }
        ],
        sortBys: [
            { value: 'name', text: 'Name' },
            { value: 'quantity', text: 'Quantity' },
            { value: 'price', text: 'Price' },
            { value: 'discount', text: 'Discount' },
        ],
        curSort: { sortBy: 'name', sortType: 'none' },
        shouldShowSort: true
    };

    componentDidMount = () => {
        if(!this.isAdminRoute()){
            const sortBys = [
                { value: 'name', text: 'Name' },
                { value: 'price', text: 'Price' },
                { value: 'discount', text: 'Discount' },
            ];
            this.setState({ sortBys });
        }
    }

    onChange = (e) => {
        // let sortBy = Object.assign({}, this.state.sortBy);
        let curSort = Object.assign({}, this.state.curSort);
        let { name, value } = e.target;
        curSort[name] = value;
        this.setState({ curSort }, () => {
            let sortBy = { name: 'none', quantity: 'none', price: 'none', discount: 'none' };
            sortBy[curSort.sortBy] = curSort.sortType;
            this.props.setSort(sortBy);
        })
    }

    toggleSort = val => this.setState({ shouldShowSort: val });

    isAdminRoute = () => this.props.location.pathname.indexOf('/admin') > -1;

    render() {
        let sortTypeOptions = this.state.sortTypes.map(type => (
            <option key={type.value} value={type.value}>{type.text}</option>
        )) 

        let sortByOptions = this.state.sortBys.map(sortBy => (
            <option key={sortBy.value} value={sortBy.value}>{sortBy.text}</option> 
        ))
        
        let ele;
        if(this.state.shouldShowSort){
            ele = (
                <div className="card">
                    <div className="card-header">
                        <h5>
                            <i className="fas fa-filter mr-3"></i>
                            Sortation
                            <button className="btn btn-info btn-sm float-right" onClick={() => this.toggleSort(false)}>Hide</button>
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-sm-3">
                                <label>By</label>
                                <select 
                                    className="form-control" 
                                    name="sortBy" 
                                    onChange={this.onChange} 
                                    value={this.state.curSort.sortBy}
                                >
                                    { sortByOptions }
                                </select>
                            </div>
                            <div className="form-group col-sm-3" >
                                <label>Sort Type</label>
                                <select 
                                    className="form-control" 
                                    name="sortType" 
                                    onChange={this.onChange} 
                                    value={this.state.curSort.sortType}
                                >
                                    { sortTypeOptions }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            ele = (
                <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <button className="btn btn-primary btn-block" onClick={() => this.toggleSort(true)}>
                            Show Sortations
                        </button>
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

const mapStateToProps = state => ({
    sortBy: state.sort.sortBy
})

export default connect(mapStateToProps, { setSort })( withRouter(SortFood) );
