import React, { Fragment } from 'react';
import FoodsList from './FoodsList';
import { Container } from 'react-bootstrap';
import CartFood from './CartFood';
import LoginUser from './LoginUser';

const UserPage = () => (
            <Fragment>
                <Container>
                    <h2 className="text-center my-5">Pick your favorite one now!!</h2>
                    <FoodsList/>
                </Container>
                <CartFood/>
                <LoginUser/>
            </Fragment>
        );

export default UserPage;