import React, { Component } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import { FiDelete } from 'react-icons/fi';
import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

class Income extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeCategories: [],
            incomes: [],
            description: '',
            value: '',
            date: '',
            category: ''
        };
        this.deleteIncome = this.deleteIncome.bind(this);
    }

    componentWillMount() {
        this.getCurrentMonthIncomes();
        this.getIncomeCategories();
    }

    async getIncomeCategories() {
        const res = await axios.get("http://localhost:3333/category/income");
        this.setState({ incomeCategories: res.data });
    }

    handleSubmit(event) {
        axios.post('http://localhost:3333/income', {
            description: this.state.description,
            value: this.state.value,
            category: JSON.parse(this.state.category),
            date: this.state.date
        });

        this.getCurrentMonthIncomes();
    }

    async deleteIncome(id, e) {
        await axios.delete('http://localhost:3333/income', {
            data: {
                "income": {
                    "_id": id
                }
            }
        });

        this.getCurrentMonthIncomes();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange = selectedDate => {
        this.setState({
            date: selectedDate
        });
    };


    async getCurrentMonthIncomes() {
        const res = await axios.get('http://localhost:3333/income/current');
        this.setState({ incomes: res.data });
    }

    render() {
        const incomes = this.state.incomes;
        return (
            <div className="incomeTable">
                <h1>
                    Income
                    </h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Group controlId="incomeForm.description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
                            </Form.Group>
                            <Form.Group controlId="incomeForm.value">
                                <Form.Label>Value</Form.Label>
                                <Form.Control type="number" name="value" onChange={this.onChange} value={this.state.value === null ? '' : this.state.value} />
                            </Form.Group>
                            <Form.Group controlId="incomeForm.date">
                                <Form.Label>Date</Form.Label><br />
                                <DatePicker selected={this.state.date === null ? '' : this.state.date} onChange={this.handleDateChange} />
                            </Form.Group>
                            <Form.Group controlId="incomeForm.category">
                                <Form.Label>Type</Form.Label>
                                <Form.Control as="select" name="category" onChange={this.onChange} value={this.state.category === null ? '' : this.state.category} >
                                    <option value="">Empty</option>
                                    {this.state.incomeCategories.map(incomeCategory => (
                                        <option key={incomeCategory._id} value={JSON.stringify(incomeCategory)}>{incomeCategory.description}</option>
                                    ))}
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
                                    <th>Value</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    incomes.map(income => (
                                        <tr key={income._id}>
                                            <td>{income.description}</td>
                                            <td>{income.value}</td>
                                            <td>{income.category.description}</td>
                                            <td>{income.date}</td>
                                            <td><button onClick={(e) => this.deleteIncome(income._id, e)}>{<FiDelete />}</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Income;