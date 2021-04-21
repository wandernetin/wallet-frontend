import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { FiDelete } from 'react-icons/fi';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../category/categoryList.css'

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
                <div class="col-12 col-md-8">
                    <div className="categoriesTable">
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
            ) : (<p>Nothing</p>)
        )
    }
}

export default CategoryList;