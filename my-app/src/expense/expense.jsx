import React, { Component } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import { FiDelete } from 'react-icons/fi';
import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

class Expense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseCategories: [],
            expenses: [],
            description: '',
            value: '',
            date: '',
            category: ''
        };
        this.deleteExpense = this.deleteExpense.bind(this);
    }

    componentWillMount() {
        this.getCurrentMonthExpenses();
        this.getExpenseCategories();
    }

    async getExpenseCategories() {
        const res = await axios.get("http://localhost:3333/category/expense");
        this.setState({ expenseCategories: res.data });
    }

    handleSubmit(event) {
        axios.post('http://localhost:3333/expense', {
            description: this.state.description,
            value: this.state.value,
            category: JSON.parse(this.state.category),
            date: this.state.date
        });

        this.getCurrentMonthExpenses();
    }

    async deleteExpense(id, e) {
        await axios.delete('http://localhost:3333/expense', {
            data: {
                "expense": {
                    "_id": id
                }
            }
        });

        this.getCurrentMonthExpenses();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange = selectedDate => {
        this.setState({
            date: selectedDate
        });
    };


    async getCurrentMonthExpenses() {
        const res = await axios.get('http://localhost:3333/expense/current');
        this.setState({ expenses: res.data });
    }

    render() {
        const expenses = this.state.expenses;
        return (
            <div className="expenseTable">
                <h1>
                    Expense
                    </h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Group controlId="expenseForm.description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
                            </Form.Group>
                            <Form.Group controlId="expenseForm.value">
                                <Form.Label>Value</Form.Label>
                                <Form.Control type="number" name="value" onChange={this.onChange} value={this.state.value === null ? '' : this.state.value} />
                            </Form.Group>
                            <Form.Group controlId="expenseForm.date">
                                <Form.Label>Date</Form.Label><br />
                                <DatePicker selected={this.state.date === null ? '' : this.state.date} onChange={this.handleDateChange} />
                            </Form.Group>
                            <Form.Group controlId="expenseForm.category">
                                <Form.Label>Type</Form.Label>
                                <Form.Control as="select" name="category" onChange={this.onChange} value={this.state.category === null ? '' : this.state.category} >
                                    <option value="">Empty</option>
                                    {this.state.expenseCategories.map(expenseCategory => (
                                        <option key={expenseCategory._id} value={JSON.stringify(expenseCategory)}>{expenseCategory.description}</option>
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
                                    expenses.map(expense => (
                                        <tr key={expense._id}>
                                            <td>{expense.description}</td>
                                            <td>{expense.value}</td>
                                            <td>{expense.category.description}</td>
                                            <td>{expense.date}</td>
                                            <td><button onClick={(e) => this.deleteExpense(expense._id, e)}>{<FiDelete />}</button></td>
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

export default Expense;