import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAccount } from '../../redux/actions/userAccountActions';
import EditUserAccount from '../common/EditUserAccount';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <EditUserAccount 
                    curAccount={this.props.curAccount} 
                    updateAccount={this.props.updateAccount} 
                    redirectLocation={'/user/account'}
                />
            </div>
        );
    }
}

EditUser.propTypes = {
    curAccount: PropTypes.object.isRequired,
    updateAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    curAccount: state.userAccount.curAccount
})

export default connect(mapStateToProps, { updateAccount })( withRouter(EditUser) );

