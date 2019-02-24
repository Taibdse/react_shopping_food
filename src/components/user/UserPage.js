import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FoodsList from './FoodsList';
import { Container } from 'react-bootstrap';
import CartFood from './CartFood';
import LoginUser from './LoginUser';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <h2 className="text-center my-5">Pick your favorite one now!!</h2>
                    <FoodsList/>
                </Container>
                <CartFood/>
                <LoginUser/>
            </Fragment>
        );
    }
}

UserPage.propTypes = {};

export default UserPage;
