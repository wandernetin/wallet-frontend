import React, { Component } from 'react';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';
import { FiDelete } from 'react-icons/fi';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../category/category.css'

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentWillMount() {
        this.getCategories();
    }


    async getCategories() {
        const res = await axios.get('http://localhost:3333/category');
        this.setState({ categories: res.data });
    }

    render() {
        const categories = this.state.categories;
        return (
            categories.length > 0 ? (
                <div className="categoriesTable">
                    <h1>
                        Category
                    </h1>
                    <div className="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <Form>
                                <Form.Group controlId="categoryForm.description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                                <Form.Group controlId="categoryForm.type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select">
                                        <option>INCOME</option>
                                        <option>EXPENSE</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Type</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map(category => (
                                            <tr id={category._id}>
                                                <td>{category.description}</td>
                                                <td>{category.type}</td>
                                                <td>{<FiDelete />}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            ) : (<p>Nothing</p>)
        )
    }
}

export default CategoryList;