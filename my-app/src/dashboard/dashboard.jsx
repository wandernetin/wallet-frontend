import React, { Component } from 'react'
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";

import ContentHeader from '../main/template/contentHeader'
import Content from '../main/template/content'
import Row from '../main/layout/row'

import credit from '../assets/images/credit.jpeg'
import debit from '../assets/images/debit.jpeg'
import balance from '../assets/images/balance.jpeg'

import AuthService from '../services/auth.service';

import { formatNumberIntoCurrency } from '../utils/currencyUtils';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            incomes: [],
            expenseSummary: 0,
            incomeSummary: 0
        }
    };

    componentWillMount() {
        this.getCurrentMonthExpenses();
        this.getCurrentMonthIncomes();
        this.getCurrentExpensesByCategories();
    }

    async getCurrentMonthExpenses() {
        const res = await axios.get('http://localhost:3333/expense/current', {
            headers: AuthService.getAuthHeader()
        });
        const totalExpenses = res.data.reduce(function (tot, arr) {
            return tot + arr.value;
        }, 0);
        this.setState({
            expenses: res.data,
            expenseSummary: totalExpenses
        });

        console.log(res.data.map(item => item.value).reduce((prev, next) => prev + next));
    }

    async getCurrentMonthIncomes() {
        const res = await axios.get('http://localhost:3333/income/current', {
            headers: AuthService.getAuthHeader()
        });
        const totalIncome = res.data.reduce(function (tot, arr) {
            return tot + arr.value;
        }, 0);
        this.setState({
            incomes: res.data,
            incomeSummary: totalIncome
        });
    }

    async getCurrentExpensesByCategories() {
        const categoriesSummaryMap = new Map();
        axios.get("http://localhost:3333/category/expense", {
            headers: AuthService.getAuthHeader()
        }).then((response) => {
            const expenseCategories = response.data;
            expenseCategories.forEach(cat => {
                axios.post('http://localhost:3333/expense/current/category', {
                    category: cat
                }, {
                    headers: AuthService.getAuthHeader()
                }).then((res) => {
                    const total = res.data.reduce((t, { value }) => t + value, 0);
                    categoriesSummaryMap.set(cat, total);
                    this.setState({
                        categoriesSummary: categoriesSummaryMap
                    })
                }, (error) => {
                    console.log(error);
                });
            });
        });
    }

    render() {
        return (
            <div>
                <ContentHeader title='Dashboard' />
                <Content>
                    <Row>
                        <div className="card" styles="width: 18rem;">
                            <img className="card-img-top" src={credit} />
                            <div className="card-body">
                                <h5 className="card-title">Credit</h5>
                                <p className="card-text">{formatNumberIntoCurrency(this.state.incomeSummary)}</p>
                            </div>
                        </div>
                        <div className="card" styles="width: 18rem;">
                            <img className="card-img-top" src={debit} />
                            <div className="card-body">
                                <h5 className="card-title">Debit</h5>
                                <p className="card-text">{formatNumberIntoCurrency(this.state.expenseSummary)}</p>
                            </div>
                        </div>
                        <div className="card" styles="width: 18rem;">
                            <img className="card-img-top" src={balance} />
                            <div className="card-body">
                                <h5 className="card-title">Balance</h5>
                                <p className="card-text">{formatNumberIntoCurrency(this.state.incomeSummary - this.state.expenseSummary)}</p>
                            </div>
                        </div>
                    </Row>
                </Content>
            </div>
        )
    }
}

export default Dashboard;