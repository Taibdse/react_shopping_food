import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Foods from './Foods';
import FoodForm from './FoodForm';
import { Container, Row, Col } from 'react-bootstrap';
import FilterForm from './FilterForm';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <h2 className="text-center my-3 font-italic">Admin Page</h2>
                <Container>
                    <Row>
                        <Col>
                            <FoodForm/>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col sm={8} className="mx-auto">
                            <FilterForm/>
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
    }
}

AdminPage.propTypes = {};

export default AdminPage;
