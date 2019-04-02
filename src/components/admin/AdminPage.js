import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Foods from './Foods';
import FoodForm from './FoodForm';
import FilterForm from './FilterForm';
import SortFood from './SortFood';

const AdminPage = () => (
    <Fragment>
        <h2 className="text-center my-3 font-italic">Foods Management</h2>
        <Container>
            <Row>
                <Col>
                    <FoodForm/>
                </Col>
            </Row>
            <Row className="my-3">
                <Col sm={12} className="mx-auto">
                    <FilterForm/>
                    <SortFood/>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Foods/>
                </Col>
            </Row>
        </Container>
    </Fragment>
);


export default AdminPage;
