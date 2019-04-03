import React, { Fragment } from 'react';
import FoodsList from './FoodsList';
import { Container } from 'react-bootstrap';
import CartFood from './CartFood';
import FilterForm from '../admin/FilterForm';
import SortFood from '../admin/SortFood';

const UserPage = () => (
            <Fragment>
                <Container>
                    <h2 className="text-center my-5">Pick your favorite one now!!</h2>
                    <div className="row mb-5">
                        <div className="col-12">
                            <FilterForm/><br/>
                            <SortFood/>
                        </div>
                    </div>
                    <FoodsList/>
                </Container>
                <CartFood/>
            </Fragment>
        );

export default UserPage;