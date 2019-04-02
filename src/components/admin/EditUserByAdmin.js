import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAccount } from '../../redux/actions/userAccountActions';
import EditUserAccount from '../common/EditUserAccount';
import { isNotEmpty } from '../../validations/isNotEmpty';

class EditUserByAdmin extends React.Component {
    static propTypes = {
        accounts: PropTypes.array.isRequired,
        updateAccount: PropTypes.func.isRequired
    }

    state = {
        curAccount: {}
    };

    componentDidMount = () => {
        let id = this.props.match.params.userId;
        let curAccount = this.props.accounts.find(acc => acc.id === id);
        this.setState({ curAccount });
    }

    render() {
        let { curAccount } = this.state;
        let element;
        if(isNotEmpty(curAccount)){
            element = (
                    <EditUserAccount 
                        curAccount={this.state.curAccount} 
                        updateAccount={this.props.updateAccount} 
                        redirectLocation={'/admin/users_manage'}
                    />
            );
        } else {
            element = (
                <div className="text-center font-italic" style={{ marginTop: '200px' }}>
                    <h2>User Not Found</h2>
                    <p>Please come back to <Link to="/admin">Admin page</Link> or <Link to="/admin/users_manage">Edit user page</Link></p>
                </div>
            )
        }
        return (
            <React.Fragment>
                { element }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    accounts: state.userAccount.accounts
})

export default connect(mapStateToProps, { updateAccount })( withRouter(EditUserByAdmin) );

