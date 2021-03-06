import React, { Component } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import { FiDelete } from 'react-icons/fi';

import AuthService from '../services/auth.service';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../category/category.css';
import '../App.css';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            description: '',
            type: ''
        };
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentWillMount() {
        this.getCategories();
    }

    handleSubmit(event) {
        axios.post('http://localhost:3333/category', {
            description: this.state.description,
            type: (this.state.type ? this.state.type : 'EXPENSE')
        }, {
            headers: AuthService.getAuthHeader()
        });

        this.getCategories();
    }

    async deleteCategory(id, e) {
        console.log(id);
        await axios.delete('http://localhost:3333/category', {
            data: {
                "category": {
                    "_id": id
                }
            }
        }, {
            headers: AuthService.getAuthHeader()
        });

        this.getCategories();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    async getCategories() {
        const res = await axios.get('http://localhost:3333/category', {
            headers: AuthService.getAuthHeader()
        });
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
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Group controlId="categoryForm.description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
                                </Form.Group>
                                <Form.Group controlId="categoryForm.type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" name="type" onChange={this.onChange} value={this.state.type === null ? '' : this.state.type} >
                                        <option>EXPENSE</option>
                                        <option>INCOME</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
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
                                            <tr key={category._id}>
                                                <td>{category.description}</td>
                                                <td>{category.type}</td>
                                                <td><button onClick={(e) => this.deleteCategory(category._id, e)}>{<FiDelete />}</button></td>
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